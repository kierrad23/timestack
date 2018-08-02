const getUser = (req, res, next) => {
  const db = req.app.get("db");
  db.getUserByAuthId([req.user == undefined ? undefined : req.user.authid])
    .then(dbuser => res.status(200).send(dbuser[0]))
    .catch(err => res.status(500));
};
const getSlots = (req, res, next) => {
  const db = req.app.get("db");
  db.slots
    .getSlots([29, req.params.date])
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
  const db = req.app.get("db");
  db.slots
    .deleteSlot([req.params.slotid])
    .then(slots => res.status(200).send(slots))
    .catch(err => res.status(500));
};
const updateSlot = (req, res, next) => {
  const db = req.app.get("db");
  db.slots
    .updateSlot([req.params.slotid, req.body.minutes])
    .then(slots => res.status(200).send(slots))
    .catch(err => res.status(500));
};
module.exports = {
  getSlots,
  getUser,
  addSlot,
  deleteSlot,
  updateSlot
};
