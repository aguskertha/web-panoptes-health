const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const moment = require('moment');
const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    NIP: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    typeName: {
        type: String,
    },


    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

doctorSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

doctorSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});
doctorSchema.plugin(mongoosePaginate);
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;