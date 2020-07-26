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


// CRUD operations (api Routes) -------

// // Get /exercise page
// app.get("/exercise", (req, res) => {
//     db.Exercise.find({})
//         .then(dbExercise => {
//             // res.render("exercise")
//             res.json(dbExercise);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

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

// app.get("/exercise", (req, res) => {

//     db.Exercise.find({})
//         .populate("exercise")
//         // .then(dbExercise => {
//         //     res.json(dbExercise);
//         // })
//         // .catch(err => {
//         //     res.json(err);
//         // });
// })

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
