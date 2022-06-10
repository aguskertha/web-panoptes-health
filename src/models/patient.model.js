const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const moment = require('moment');
const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    NIK: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    bornDate: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    
    contact: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    doctorID: {
        type: String,
    },

    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

patientSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

patientSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});
patientSchema.plugin(mongoosePaginate);
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;