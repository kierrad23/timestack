const getSlots = (req, res, next) => {
  console.log(req.session);
  const db = req.app.get("db");
  db.slots
    .getSlots(parseInt(req.params.day))
    .then(slots => res.status(200).send(slots));
};
module.exports = {
  getSlots
};
