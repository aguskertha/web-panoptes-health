const Room = require('./../models/room.model')
const Bed = require('./../models/bed.model')
const Device = require('./../models/device.model')
const Patient = require('./../models/patient.model')
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

const getBedsByRoom = async (req, res, next) => {
    try {
        const roomID = req.params.roomID;
        const beds = await Bed.find({roomID})
        res.json(beds)
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

const getBedByID = async (req, res, next) => {
    try {
        const bedID = req.params.bedID
        const bed = await Bed.findOne({_id: ObjectID(bedID)})
        if(!bed){
            throw 'Bed not Found!'
        }
        const room = await Room.findOne({_id: ObjectID(bed.roomID)})
        if(!room){
            throw 'Room not found!'
        }
        let device = {}
        if(bed.deviceID !== ''){
            device = await Device.findOne({_id: ObjectID(bed.deviceID)})
            if(!device){
                throw 'Device not found!'
            }
        }
        let patient = {}
        if(bed.patientID !== ''){
            patient = await Patient.findOne({_id: ObjectID(bed.patientID)})
            if(!patient){
                throw 'Patient not found!'
            }
        }
        const newRoom= {
            _id: bed._id,
            bed,
            room,
            patient,
            device
        }
        res.json(newRoom)
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

module.exports = {
    createBed,
    getBedsByRoom,
    getBedByID
}