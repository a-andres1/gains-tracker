const express = require("express");
// const mongojs = require("mongojs");
const mongoose = require("mongoose");
const logger = require("morgan");
const db = require("./models");
const path = require("path");
const Workout = require("./models/Workout");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// THESE SHOULD BE CHANGED TO REFLECT YOUR DATABASE!!
// const databaseUrl = "notetaker";
// const collections = ["notes"];

// const db = mongojs(databaseUrl, collections);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//routes

// // api route
app.get("/api/workouts", (req,res) => {
  Workout.find({})
    .then(dataStuff => {
      console.log(dataStuff)
      res.json(dataStuff)
    });
});

// html route
app.get("/stats", (req,res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// api route
app.get("/api/workouts/range", (req, res) => {
  Workout.find({})
  .then(data => {
    res.json(data)
  });
});

// html route
app.get("/exercise", (req,res) => { 
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});


// api put route
app.put("/api/workouts/:id", (req,res) => {
  console.log(req.params.id);
  db.Workout.updateOne((err, workout) => {
   if (err) {
     console.log(err);
     res.status(500).json(err);
   } else {
     res.json(workout);
   }
  })
 
});

// api post route
app.post("/api/workouts", ({body}, res) => {
  db.Workout.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { workout: _id } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});


// Listen on port 3000
app.listen(PORT, () => {
    console.log("App running on port 3000!");
  });
  