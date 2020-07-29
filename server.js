const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3001;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

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
    db.Workout.find({}).populate("exercises")
        //May be Exercise
        .then(workout => {
            // console.log("workout = " + workout)
            // res.render("workouts")
            let newWorkoutArray = [];
            for (let i = 0; i < workout.length; i++) {
                let newWorkoutObject;
                let totalDuration = 0;
                for (let j = 0; j < workout[i].exercises.length; j++) {
                    totalDuration += workout[i].exercises[j].duration;
                    // console.log("totalDuration = " + totalDuration)
                    // console.log("workout[i].exercises[j].duration = " + workout[i].exercises[j].duration);
                }

                newWorkoutObject = { day: workout[i].day, exercises: workout[i].exercises, totalDuration: totalDuration };

                newWorkoutArray.push(newWorkoutObject);
            }
            // console.log("newWorkoutArray[0].totalDuration = " + )
            res.json(newWorkoutArray)
            // res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
});


// Return json data from updated id when user adds exercise (addExercise)
app.put("/api/workouts/:id", (req, res) => {
    db.Exercise.create(req.body)
        .then((exerciseData) => {
            db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: exerciseData._id } }, { new: true }
            ).then(exercise => {
                res.json(exercise);
            })
                .catch(err => {
                    res.json(err);
                });
        })
})

// Post new exercise (createWorkout)
app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(workout => {
            // console.log(workout);
            res.json(workout)
            // res.json(req.body)
        })
        .catch(({ message }) => {
            console.log(message);
        });
});

// Get workouts range (getWorkoutsInRange)
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).limit(7).populate("exercises")
        .then(workout => {
            res.json(workout);
        })
        .catch(({ message }) => {
            console.log(message);
        });
})


// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
