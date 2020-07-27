const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

// Create Databases -------------


        // Put these in post routes
// // Create Exercisedb
// db.Exercise.create({ type: "cardio" })
//     .then(dbExercise => {
//         console.log(dbExercise);
//     })
//     .catch(({ message }) => {
//         console.log(message);
//     });

// // Create Workoutdb
// db.Workout.create({ type: "cardio" })
//     .then(dbWorkout => {
//         console.log(dbWorkout);
//     })
//     .catch(({ message }) => {
//         console.log(message);
//     });



//Render Pages (HTML ROUTES) ---------

//Render exercise page
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"))
});


// Render stats page
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"))
});


// (other) CRUD operations (api Routes) -------

// // Get new exercise
// app.get("/api/workouts", (req, res) => {
//     db.Workout.find({})
//         .then(workouts => {
//             // res.render("exercise")
//             res.json(workouts);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// Post new exercise
app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(Workout => {
            // res.render("exercise")
            res.json(Workout);
        })
        .catch(err => {
            res.json(err);
        });
});


// app.post("/submit", ({ body }, res) => {
//   db.Note.create(body)
//     .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });


// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
