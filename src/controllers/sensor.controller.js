const Device = require("../models/device.model");
const Patient = require("../models/patient.model");
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
            throw 'Patient not registered!'
        }
        const sensor = {
            code, patientID: device.patientID, heartRate, heartAvgRate, oxiRate
        }
        const newSensor = new Sensor(sensor)
        await newSensor.save()
        res.json({message: 'Success'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

// const deleteSensorByCode = async (req, res, next) => {
//     try {
//         const 
//         // await Sensor.deleteMany({})
//     } catch (error) {
//         res.status(400).json({message: error.toString()})
//     }
// }

const deleteSensors = async (req, res, next) => {
    try {
        const code = req.query.code;
        const patientID = req.query.patientID;
        if (code && patientID){
            const device = await Device.findOne({code: code})
            if(!device){
                throw 'Device not found!'
            }
            const patient = await Patient.findOne({_id: ObjectID(patientID)})
            if(!patient){
                throw 'Patient not found!'
            }
            await Sensor.deleteMany({patientID:patientID, code:code})
            return res.json({message: `Deleted Sensors with patientID ${patientID} and code ${code} Successfully!`})
        }
        else if(code){
            const device = await Device.findOne({code: code})
            if(!device){
                throw 'Device not found!'
            }
            await Sensor.deleteMany({code:code})
            return res.json({message: `Deleted Sensors with code ${code} Successfully!`})
        }
        else if (patientID){
            const patient = await Patient.findOne({_id: ObjectID(patientID)})
            if(!patient){
                throw 'Patient not found!'
            }
            await Sensor.deleteMany({patientID:patientID})
            return res.json({message: `Deleted Sensors with patientID ${patientID} Successfully!`})
        }
        
        else{
            await Sensor.deleteMany()
            return res.json({message: 'Deleted Sensors Successfully!'})
        }

        
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

module.exports = {
    createSensorData,
    deleteSensors,
    getSensors
}