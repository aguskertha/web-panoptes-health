const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const roomShcema = new Schema({
    name: {
        type: String,
        required: true
    },

    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

roomShcema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

roomShcema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const Room = mongoose.model('Room', roomShcema);
module.exports = Room;