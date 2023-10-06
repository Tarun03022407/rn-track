const express = require("express");
const { TrackModel } = require("../Models/TrackModel");
// const requireAuth= require('../middleware/authenticate')
const trackRouter = express.Router();
// trackRouter.use(authenticate)
// trackRouter.get("/tracks", async (req, res) => {
//   const tracks = await TrackModel.find({ userId: req.user._id });
//   //after connecting to mongo_db database user userId:req.users._id
//   res.send(tracks);
// });
trackRouter.get("/tracks", async (req, res) => {
    // res.send(req.user._id)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const tracks = await TrackModel.find({ userId: req.user._id });
    res.send(tracks);
  });
  
trackRouter.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    res.status(422).send({ error: "you must provide name and locations" });
  }
  try {
    const track = new TrackModel({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});
module.exports = { trackRouter };
