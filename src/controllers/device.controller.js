const ObjectID = require('mongodb').ObjectId;
const Device = require('./../models/device.model')
const Patient = require('./../models/patient.model')
const moment = require('moment');
const { disconnect } = require('mongoose');

const registerDevice = async (req, res, next) => {
    try {
        const {name, code, deviceIP} = req.body;
        console.log(req. body)
        const device = await Device.findOne({code: code})
        if(device){
            res.json({message: 'Device already registered!'})
        }
        else{
            const newDevice = new Device({name, code, deviceIP, status: false, patientID: ''});
            await newDevice.save();
            res.json({message: 'Device registered successfully!'})
        }

    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

const connectDeviceToPatient = async (req, res, next) => {
    try {
        const {deviceID, patientID} = req.body;
        const patient = await Patient.findOne({_id: ObjectID(patientID)})
        if(!patient){
            throw 'Patient not found!'
        }
        if(patient.status == true){
            throw 'Patient connected with different Device!'
        }
        const device = await Device.findOne({_id: ObjectID(deviceID)})
        if(!device){
            throw 'Device not found!'
        }
        if(device.status == true){
            if(device.patientID != patient._id){
                throw 'Device connected with different Patient!'
            }
            else{
                return res.json({message: 'Device already connect with this Patient!'})
            }
        }
        const updatedDevice = await Device.updateOne(
            {
                _id: ObjectID(deviceID)
            },
            {
                $set: {
                    status: true,
                    patientID: patientID
                }
            }
        )
        if(updatedDevice){
            await Patient.updateOne(
                {
                    _id: ObjectID(patientID)
                },
                {
                    $set: {
                        status: true,
                    }
                }
            )
        }
        
        res.json({message: `Successfully connected device ${device.name} with ${patient.name}`})
        
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

const disconnectDeviceToPatient = async (req, res, next) => {
    try {
        const deviceID = req.body.deviceID;
        const device = await Device.findOne({_id: ObjectID(deviceID)})
        if(!device){
            throw 'Device not found!'
        }
        if(device.status == false){
            throw 'Device already disconnect!'
        }
        await Device.updateOne(
            {
                _id: ObjectID(deviceID)
            },
            {
                $set: {
                    status: false,
                    patientID: ''
                }
            }
        )
        res.json({message: 'Device disconnected successfully!'})
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

module.exports = {
    registerDevice,
    connectDeviceToPatient,
    disconnectDeviceToPatient
}