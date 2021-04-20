// api route
app.get("/api/workouts", (req,res) => {
    db.Workout.find({})
      .then(dataStuff => {
        res.json(dataStuff)
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(data => {
      res.json(data)
    });
  });

  app.put("/api/workouts/:id", (req,res) => {
    Workout.save({})
    .then((updatedWorkout) => {
      res.json(updatedWorkout)
    })
  });