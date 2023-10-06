// Use new URL parser and unified topology to avoid deprecation warnings.

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://tarun:tarun0302@cluster0.sit5oyq.mongodb.net/tracker?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

mongoose
  .connect(uri, {
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true, // Use unified topology
  })
  .then(() => {
    console.log("connection succeeded");
  })
  .catch((err) => console.log("err", err));
const { userRouter } = require("./Routes/AuthRoutes");
const { authenticate } = require("./middleware/authenticate");
const { trackRouter } = require("./Routes/TrackRoutes");
const bodyParsor = require("body-parser");
app.use(bodyParsor.json());
app.use(express.json());

app.get("/", authenticate, (req, res) => {
  res.send(`your email : ${req.user}`);
});
app.use("/users", userRouter);

app.use(authenticate);

app.use("/tracks", trackRouter);

// mongoose.connection.on("connected", () => {
//   console.log("Connected to MongoDB");
// });

// mongoose.connection.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

app.listen(3000, async () => {
  console.log(`app running at 3000`);
});

// Define your routes and middleware here
