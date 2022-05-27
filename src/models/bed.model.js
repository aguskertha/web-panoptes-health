const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const bedSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    roomID: {
        type: String,
        required: true
    },
    deviceID: {
        type: String,
    },
    patientID: {
        type: String,
    },
    
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

bedSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

bedSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const Bed = mongoose.model('Bed', bedSchema);
module.exports = Bed;