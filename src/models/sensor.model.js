const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const moment = require('moment');
const sensorSchema = new Schema({
    bedID: {
        type: String,
        required: true
    },
    deviceID: {
        type: String,
        required: true
    },
    patientID: {
        type: String,
        required: true
    },
    heartRate: {
        type: Number,
        required: true
    },
    heartAvgRate: {
        type: Number,
        required: true
    },
    oxiRate: {
        type: Number,
        required: true
    },
    

    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

sensorSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

sensorSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});
sensorSchema.plugin(mongoosePaginate);
const Sensor = mongoose.model('Sensor', sensorSchema);
module.exports = Sensor;