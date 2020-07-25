const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

// app.get("/exercise", (req, res) => {
//     console.log(body)
//     res.render(body.exercise);
//     // db.Exercise.find({})
//     //     .then(dbExercise => {
//     //         res.render(exercise.html);
//     //     })
//     //     .catch(err => {
//     //         res.json(err);
//     //     });
// });


// Create Exercisedb
db.Exercise.create({ workoutType: "cardio" })
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });

// Get /exercise page
app.get("/exercise", (req, res) => {
  db.Exercise.find({})
      .then(dbExercise => {
        res.render(exercise.html)
    //   res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

// Get /stats page
// app.get("/stats", (req, res) => {
//   db.User.find({})
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.post("/submit", ({ body }, res) => {
//   db.Note.create(body)
//     .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/populateduser", (req, res) => {

//   db.User.find({})
//     .populate("notes")
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });

  // TODO
  // =====
  // Write the query to grab the documents from the User collection,
  // and populate them with any associated Notes.
  // TIP: Check the models out to see how the Notes refers to the User
// });
// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
