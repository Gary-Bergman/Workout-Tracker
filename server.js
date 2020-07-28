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

// Get exercises (getLastWorkout)
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(workouts => {
            // res.render("workouts")
            res.json(workouts);
        })
        .catch(err => {
            res.json(err);
        });
});


// Need to return json data from updated id (addExercise)
app.put("/api/workouts/" + id), (req, res) => {
    db.Exercise.create(req.body)
    console.log("Test!")
        .then(dbExercise => {
            console.log("Test" + dbExercise);
        })
        .catch(({ message }) => {
            console.log(message);
        });
}



// Post new exercise (createWorkout)
app.post("/api/workouts", (req, res) => {
   db.Workout.create(req.body)
    .then(workout => {
        console.log(workout);
       res.json(req.body)
    })
    .catch(({ message }) => {
        console.log(message);
    });
});

// // Get workouts range (getWorkoutsInRange)
// app.get("/api/workouts/range")



// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
