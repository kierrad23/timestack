const getUser = (req, res, next) => {
  const db = req.app.get("db");
  db.getUserByAuthId([req.user == undefined ? undefined : req.user.authid])
    .then(dbuser => res.status(200).send(dbuser[0]))
    .catch(err => res.status(500));
};
const getSlots = (req, res, next) => {
  const db = req.app.get("db");
  db.slots
    .getSlots([req.user.authid, parseInt(req.params.day)])
    .then(slots => res.status(200).send(slots));
};

const addSlot = (req, res, next) => {
  const db = req.app.get("db");
  const { event, minutes, day } = req.body;
  // console.log(event, minutes, day);
  db.slots
    .addSlot([req.user.userid, event, minutes, day, date])
    .then(slots => res.status(200).send(slots))
    .catch(err => res.status(500));
};
module.exports = {
  getSlots,
  getUser,
  addSlot
};
