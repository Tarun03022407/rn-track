const mongoose = require("mongoose");
const pointSchema = mongoose.Schema({
  timestamp: Number,
  coords: {
    langitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});
const trackSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  name: { type: String, default: "" },
  locations: [pointSchema],
});
const TrackModel = mongoose.model("track", trackSchema);
module.exports = { TrackModel };
