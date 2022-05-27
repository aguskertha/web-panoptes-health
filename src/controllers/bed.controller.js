const Room = require('./../models/room.model')
const Bed = require('./../models/bed.model')
const ObjectID = require('mongodb').ObjectId;

const createBed = async (req, res, next) => {
    try {
        const {name, roomID} = req.body;
        const room = await Room.findOne({_id: ObjectID(roomID)})
        if(!room){
            throw 'Room not found!'
        }
        const bed = {name, roomID, status: false, patientID: '', deviceID: ''}
        const newBed = new Bed(bed)
        await newBed.save()
        res.json({message: 'Bed created successfully!'})
        
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

module.exports = {
    createBed
}