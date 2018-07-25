const express = require ('express');
// const bcrypt = require('bcrypt');
// const bodyparser = require("body-parser");

const User = require('../models/user-model.js');
const Mission = require('../models/mission-model.js');

const router = express.Router();

// // GET ALL THE MISSIONS IN THE DATABASE
// router.get("/missions", (req,res,next) => {
//     Mission.find()
//     .then((missionResults) => {
//         res.json(missionResults);
//     })
//     .catch((err) => {
//         next(err);
//     });
// });

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
        User.findByIdAndUpdate(req.user._id, {$push : {missions: newMission}})
        .then((user) => {
                console.log(user)
        }).catch((err)=>{
            console.log(err)
        });
    })
    .catch((err) => {
        next(err);
    });


});

// // GET THE CURRENT USER MISSIONS
// router.get("/client/missions", (req,res,next) => {
//     Mission.find({client:req.user._id})
//     .then((missionResults) => {
//         res.json(missionResults);
//     })
//     .catch((err) => {
//         next(err);
//     });
// });

// router.get("/worker/missions", (req,res,next) => {
//     Mission.find({worker:req.user._id})
//     .then((missionResults) => {
//         res.json(missionResults);
//     })
//     .catch((err) => {
//         next(err);
//     });
// });

// // GET MISSIONS
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