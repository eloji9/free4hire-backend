const express = require ('express');
// const bcrypt = require('bcrypt');
// const bodyparser = require("body-parser");

const User = require('../models/user-model.js');
const Mission = require('../models/mission-model.js');

const router = express.Router();

// GET ALL THE MISSIONS IN THE DATABASE
router.get("/missions", (req,res,next) => {
    Mission.find()
    .then((missionResults) => {
        res.json(missionResults);
    })
    .catch((err) => {
        next(err);
    });
});

// POST A MISSION
router.post("/process-missions", (req,res,next) => {
    console.log("I reach the backend")

    const {
        type,
        adress,
        // worker,
        startDate,
        startHour,
        startMin,
        endDate,
        endHour,
        endMin,
        price,
    } = req.body;
    const startDateTime = `${startDate} ${startHour}:${startMin}:00`;
    const endDateTime = `${endDate} ${endHour}:${endMin}:00`;
    const priceHour = `${price}€`;
    var newMission = ""
    Mission.create({
        type,
        worker: req.user._id,
        startDateTime,
        endDateTime,
        priceHour,
        adress,
    })
    .then((missionDoc) => {
       newMission = missionDoc._id
        res.json(missionDoc);
        User.findByIdAndUpdate(
            req.user._id, {
                $push : {
                    missions: newMission
                }
            }
        )
        .then((user) => {
                console.log(user)
        })
        .catch((err)=>{
            console.log(err)
        });
    })
    .catch((err) => {
        next(err);
    });
});


// GET WORKER MISSIONS
router.get("/missions/:workerId", (req, res, next) => {
    // Erreur-----------
    // const workerId = req.params;
    const workerId = req.params.workerId;
    User.findById(workerId)
    .populate({
        path: 'missions',
        populate: {path:'worker'}})
    .then((result) => {
        res.json(result);
        // console.log(result);
    })
    .catch((err) => {
        next(err);
    });
});

// GET MISSIONS
// router.get("/mission/find/:missionId", (req, res, next) => {

//     const { missionId } = req.params;

//     Mission.findById(missionId)
//     .then((result) => {
//       const {
//         startDateTime,
//         endDateTime }
//         = result;

//       return Mission.findCorresponding(startDateTime, endDateTime, type)
//       .then((missionResults) => {
//         res.json(missionResults);
//       })
//     })
//     .catch((err) => {
//       next(err)
//     })
//   })

module.exports = router;