const ObjectID = require('mongodb').ObjectId;
const Device = require('./../models/device.model')
const Patient = require('./../models/patient.model')
const Bed = require('./../models/bed.model')
const moment = require('moment');
const { disconnect } = require('mongoose');

const registerDevice = async (req, res, next) => {
    try {
        const {name, code, deviceIP} = req.body;
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

const connectDeviceToBed = async (req, res, next) => {
    try {
        const {deviceID, bedID} = req.body;
        const bed = await Bed.findOne({_id: ObjectID(bedID)})
        if(!bed){
            throw 'Bed not found!'
        }
        const device = await Device.findOne({_id: ObjectID(deviceID)})
        if(!device){
            throw 'Device not found!'
        }
        if(bed.deviceID !== '' || device.status == true){
            throw 'Bed connected with different Device!'
        }
        const updatedBed = await Bed.updateOne(
            {
                _id: ObjectID(bedID)
            },
            {
                $set: {
                    deviceID: deviceID
                }
            }
        )
        if(updatedBed){
            await Device.updateOne(
                {
                    _id: ObjectID(deviceID)
                },
                {
                    $set: {
                        status: true
                    }
                }
            )
        }
        res.json({message: `Device ${device.name} connected with Bed ${bed.name}`})
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

const disconnectDeviceToBed = async (req, res, next) => {
    try {
        const bedID = req.body.bedID;
        const bed = await Bed.findOne({_id: ObjectID(bedID)})
        if(!bed){
            throw 'Bed not found!'
        }
        if(bed.deviceID == ''){
            throw 'No Device connected!'
        }
        const device = await Device.findOne({_id: ObjectID(bed.deviceID)})
        if(!device){
            throw 'Device not found!'
        }
        const updatedBed = await Bed.updateOne(
            {
                _id: ObjectID(bedID)
            },
            {
                $set: {
                    deviceID: ''
                }
            }
        )
        if(updatedBed){
            await Device.updateOne(
                {
                    _id: ObjectID(bed.deviceID)
                },
                {
                    $set: {
                        status: false
                    }
                }
            )
        }
        res.json({message: `Device ${device.name} disconected from Bed ${bed.name}`})
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

const getDevices = async (req, res, next) => {
    try {
        const devices = await Device.find()
        res.json(devices)
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

const getDeviceByID = async (req, res, next) => {
    try {
        const deviceID = req.params.deviceID;
        const device = await Device.findOne({_id: ObjectID(deviceID)})
        if(!device){
            throw 'Device not found!'
        }
        res.json(device)
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

const getAvailableDevices = async (req, res, next) => {
    try {
        const devices = await Device.find({status: false})
        res.json(devices)
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

module.exports = {
    registerDevice,
    connectDeviceToBed,
    disconnectDeviceToBed,
    getDevices,
    getDeviceByID,
    getAvailableDevices
}