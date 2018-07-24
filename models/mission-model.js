const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const missionSchema = new Schema({
    type: {
        type: String,
        enum: ['cleaner', 'babysitter', 'petsitter', 'personnal driver'],
        required: true,
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    adress: {
        type: String,
    },
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    },
    priceHour:{
        type: Number,
        required: true,
    }
},{
    timestamps: true
});

const Mission = mongoose.model('Mission', missionSchema);

// missionSchema.findCorresponding = function findCorresponding(startDateTime, endDateTime, type){
//     // const startQuery =
//     const firstQuery =
//     this.find({ startDateTime }).populate({path: 'client'});

//     // const endQuery =
//     const secondQuery =
//     this.find({ endDateTime }).populate({path: 'client'});

//     const thirdQuery =
//     this.find({ type }).populate({path: 'client'});

//     return Promise.all([firstQuery, secondQuery, thirdQuery])
//     .then((results)=>{
//       const [firstResults, secondResults] = results;

//       const intersectionResults = [];

//       firstResults.forEach((docA) => {
//         secondResults.forEach((docB) => {
//           if (docA._id.toString() === docB._id.toString()){
//             intersectionResults.push(docA)
//           }
//         })
//       })
//       return intersectionResults
//     })

//   }

module.exports = Mission;