const express = require("express");
const session = require("express-session");
const passport = require("passport");
const Auth = require("passport-auth0");
const bp = require("body-parser");
const app = express();
const massive = require("massive");
require("dotenv").config();
const ctrl = require("./ctrl");

app.use(express.static(`${__dirname}/../build`));

app.use(bp.json());

app.use(
  session({ secret: "a secret", resave: false, saveUninitialized: false })
);

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CSTRING).then(db => {
  app.set("db", db);
});

passport.use(
  new Auth(
    {
      domain: process.env.DOMAIN,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/login",
      scope: "openid profile"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      return done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  const db = app.get("db");
  db.getUserByAuthId([user.id]).then(dbuser => {
    if (!dbuser[0]) {
      db.createUserByAuthId([user.displayName || user.nickname, user.id]).then(
        newuserid => {
          return done(null, {
            userid: newuserid[0].id,
            authid: user.id,
            name: user._json.name
          });
        }
      );
    } else {
      return done(null, {
        userid: dbuser[0].id,
        authid: user.id,
        name: user._json.name
      });
    }
  });
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
const authenticated = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  } else {
    next();
  }
};
app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/dashboard",
    failureRedirect: "http://localhost:3000/#/login"
    // successRedirect: "/#/dashboard",
    // failureRedirect: "/#/login"
  })
);
app.get("/logout", ctrl.logout);

app.get("/api/checkuser", ctrl.getUser);

app.get("/api/dashboard/:date", ctrl.getSlots);
app.delete("/api/deleteslot/:slotid", ctrl.deleteSlot);
app.post("/api/addslot", ctrl.addSlot);
app.put("/api/updateslot/:slotid", ctrl.updateSlot);

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(port));
