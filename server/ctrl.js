const getUser = (req, res, next) => {
  const db = req.app.get("db");
  db.getUserByAuthId([req.user === undefined ? undefined : req.user.authid])
    .then(dbuser => res.status(200).send(dbuser[0]))
    .catch(err => res.status(500));
};
const logout = (req, res, next) => {
  req.session.destroy(() => res.redirect(process.env.REACT_LOGOUT_REDIRECT));
};
const getSlots = (req, res, next) => {
  const db = req.app.get("db");
  db.slots
    .getSlots([req.user.userid, req.params.date])
    .then(slots => res.status(200).send(slots))
    .catch(err => res.status(500));
};

const addSlot = (req, res, next) => {
  const db = req.app.get("db");
  const { event, minutes, date } = req.body;
  db.slots
    .addSlot([req.user.userid, event, minutes, date])
    .then(slots => res.status(200).send(slots))
    .catch(err => res.status(500));
};
const deleteSlot = (req, res, next) => {
  const { id, date } = req.query;
  const db = req.app.get("db");
  db.slots
    .deleteSlot([req.user.userid, id, date])
    .then(slots => res.status(200).send(slots))
    .catch(err => res.status(500));
};
const updateSlot = (req, res, next) => {
  const db = req.app.get("db");
  db.slots
    .updateSlot([
      req.params.slotid,
      req.body.minutes,
      req.user.userid,
      req.body.date
    ])
    .then(slots => res.status(200).send(slots))
    .catch(err => res.status(500));
};

const getNotes = (req, res) => {
  const db = req.app.get("db");
  db.notes
    .getNotes(req.user.userid)
    .then(notes => res.status(200).send(notes))
    .catch(err => res.status(500));
};
const addNote = (req, res) => {
  const db = req.app.get("db");
  const { note, date } = req.body;
  db.notes
    .addNote([req.user.userid, note, date])
    .then(notes => res.status(200).send(notes))
    .catch(err => res.status(500));
};
const updateNote = (req, res) => {
  const db = req.app.get("db");
  const { note } = req.body;
  const { noteid } = req.params;
  db.notes
    .updateNote([noteid, req.user.userid, note])
    .then(notes => res.status(200).send(notes))
    .catch(err => res.status(500));
};
const deleteNote = (req, res) => {
  const db = req.app.get("db");
  const { noteid } = req.params;
  db.notes
    .deleteNote([req.user.userid, noteid])
    .then(notes => res.status(200).send(notes))
    .catch(err => res.status(500));
};

const getLimits = (req, res) => {
  const db = req.app.get("db");
  db.limits
    .getLimits(req.user.userid)
    .then(notes => res.status(200).send(notes))
    .catch(err => res.status(500));
};
const addLimit = (req, res) => {
  const db = req.app.get("db");
  const { event, limit } = req.body;
  db.limits
    .addLimit([req.user.userid, event, limit])
    .then(notes => res.status(200).send(notes))
    .catch(err => res.status(500));
};
const deleteLimit = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;
  db.limits
    .deleteLimit([req.user.userid, id])
    .then(notes => res.status(200).send(notes))
    .catch(err => res.status(500));
};
const getAllSlots = (req, res) => {
  const db = req.app.get("db");
  const { start, end } = req.query;
  db.limits
    .getAllSlots([req.user.userid, start, end])
    .then(slots => res.status(200).send(slots))
    .catch(err => res.status(500));
};
module.exports = {
  getSlots,
  getUser,
  addSlot,
  deleteSlot,
  updateSlot,
  logout,
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  getLimits,
  addLimit,
  deleteLimit,
  getAllSlots
};
