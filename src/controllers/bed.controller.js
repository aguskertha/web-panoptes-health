const Room = require('./../models/room.model')
const Bed = require('./../models/bed.model')
const Device = require('./../models/device.model')
const Patient = require('./../models/patient.model');
const Sensor = require('../models/sensor.model');
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

const getBedsConnected = async (req, res, next) => {
    try {
        const beds = await Bed.find({deviceID: {$ne: ''}, patientID: {$ne: ''}})
        let newDatas = []
        for (let index = 0; index < beds.length; index++) {
            const bed = beds[index];
            const device = await Device.findOne({_id: ObjectID(bed.deviceID)})
            const patient = await Patient.findOne({_id: ObjectID(bed.patientID)})
            const room = await Room.findOne({_id: ObjectID(bed.roomID)})
            const sensors = await Sensor.find({bedID: bed._id}).sort({createdAt: -1})
            const sensor = sensors[0]
            const newData = {
                bed,
                device,
                patient,
                room,
                sensor
            }
            if(sensor){
                if((sensor.heartRate < 60 || sensor.heartRate > 100) && (sensor.oxiRate < 95 || sensor.oxiRate > 100) ){
                    newData.status = 3
                }
                else if ((sensor.heartRate < 60 || sensor.heartRate > 100) || (sensor.oxiRate < 95 || sensor.oxiRate > 100)){
                    newData.status = 2
                }
                else{
                    newData.status = 1
                }
            }
            newDatas.push(newData)
        }
        newDatas.sort(function(a, b) {
            return b.status - a.status;
        });
        res.json(newDatas)
    } catch (error) {
        console.log(error.toString())
        res.status(400).json({message: error.toString()});
    }
}

const deleteBedByID = async (req, res, next) => {
    try {
        const bedID = req.params.bedID
        const bed = await Bed.findOne({_id: bedID})
        if(!bed){
            throw 'Bed not found!'
        }
        if(bed.patientID !== '' || bed.deviceID !== ''){
            throw 'Bed cant deleted!'
        }
        await Bed.deleteOne({_id: bedID})
        res.json({message: 'Bed deleted successfully'})
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

module.exports = {
    createBed,
    getBedsByRoom,
    getBedByID,
    getBedsConnected,
    deleteBedByID
}