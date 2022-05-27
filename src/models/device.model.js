const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const deviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    deviceIP: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
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

deviceSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

deviceSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;