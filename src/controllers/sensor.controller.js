const Device = require("../models/device.model");
const Patient = require("../models/patient.model");
const Bed = require('./../models/bed.model')
const ObjectID = require('mongodb').ObjectId;
const Sensor = require('./../models/sensor.model')

const createSensorData = async (req, res, next) => {
    try {
        const {code, heartRate, heartAvgRate, oxiRate} = req.body;
        const device = await Device.findOne({code:code})
        if(!device){
            throw 'Device not found!'
        }
        if(device.status == false){
            throw 'Device not registered!'
        }
        const bed = await Bed.findOne({deviceID: ObjectID(device._id)})
        if(!bed){
            throw 'Bed not found!'
        }
        if(bed.patientID == ''){
            throw `Patient not registered on Bed ${bed.name}`
        }
        const patient = await Patient.findOne({_id: ObjectID(bed.patientID)})
        if(!patient){
            throw `Patient not found on Bed ${bed.name}`
        }
        if(patient.status == false){
            throw `Patient not registered on Bed ${bed.name}`
        }
        
        const sensor = {
            bedID: String(bed._id), deviceID: String(device._id), patientID: String(patient._id),  heartRate, heartAvgRate, oxiRate
        }
        const newSensor = new Sensor(sensor)
        await newSensor.save()
        res.json({message: 'Success'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getSensorsByBed = async (req, res ,next) => {
    try {
        const bedID = req.params.bedID;
        const bed = await Bed.findOne({_id: ObjectID(bedID)})
        if(!bed){
            throw 'Bed not found!'
        }
        const sensors = await Sensor.find({bedID})
        res.json(sensors)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getSensorMonitorByBed = async (req, res, next) => {
    try {
        const bedID = req.params.bedID;
        const bed = await Bed.findOne({_id: ObjectID(bedID)})
        if(!bed){
            throw 'Bed not found!'
        }
        const sensors = await Sensor.find({bedID}).sort({createdAt: -1})
        const sensor = sensors[0]
        res.json(sensor.heartRate)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const deleteSensors = async (req, res, next) => {
    try {
        // const bedID = req.body.bedID;
        // const deviceID = req.body.deviceID;
        // const patientID = req.body.patientID;
        // if(bedID && deviceID && patientID){
        //     const bed = await Bed.findOne({_id: ObjectID(bedID)})
        //     if(!bed){
        //         throw 'Bed not found!'
        //     }
            
        // }
        // else{
            await Sensor.deleteMany()
            return res.json({message: 'Deleted Sensors Successfully!'})
        // }

        
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getSensors = async (req, res, next) => {
    try {
        const sensors = await Sensor.find()
        res.json(sensors)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getDummyData = async (req, res, next) => {
    try {
        res.json(Math.random())
    } catch (error) {
        
    }
}

module.exports = {
    createSensorData,
    deleteSensors,
    getSensors,
    getSensorsByBed,
    getDummyData,
    getSensorMonitorByBed,
}