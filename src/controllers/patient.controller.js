const Patient = require('./../models/patient.model');
const Bed = require('./../models/bed.model');

const ObjectID = require('mongodb').ObjectId;

const createPatient = async (req, res, next) => {
    try {
        const {name, NIK, age, bornDate, address, contact} = req. body;
        //need validation NIK length, valid contact num
        
        const patient = await Patient.findOne({NIK: NIK})
        if(patient){
            throw 'Patient already registered!'
        }
        const newPatient = new Patient({name, NIK, age, bornDate, address, contact, status: false});
        await newPatient.save();
        res.json({message: 'Patient registered!'})

    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

const connectPatientToBed = async (req, res, next) => {
    try {
        const {bedID, patientID} = req.body;
        const bed = await Bed.findOne({_id: ObjectID(bedID)})
        if(!bed){
            throw 'Bed not found!'
        }
        const patient = await Patient.findOne({_id: ObjectID(patientID)})
        if(!patient){
            throw 'Patient not found!'
        }
        if(bed.patientID !== '' || patient.status == true){
            throw 'Patient connected with different Device!'
        }
        const updatedBed = await Bed.updateOne(
            {
                _id: ObjectID(bedID)
            },
            {
                $set: {
                    patientID: patientID
                }
            }
        )
        if(updatedBed){
            await Patient.updateOne(
                {
                    _id: ObjectID(patientID)
                },
                {
                    $set: {
                        status: true
                    }
                }
            )
        }
        res.json({message: `Patient ${patient.name} connected with Bed ${bed.name}`})
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}


const disconnectPatientToBed = async (req, res, next) => {
    try {
        const bedID = req.body.bedID;
        const bed = await Bed.findOne({_id: ObjectID(bedID)})
        if(!bed){
            throw 'Bed not found!'
        }
        if(bed.patientID == ''){
            throw 'No Patient connected!'
        }
        const patient = await Patient.findOne({_id: ObjectID(bed.patientID)})
        if(!patient){
            throw 'patient not found!'
        }
        const updatedBed = await Bed.updateOne(
            {
                _id: ObjectID(bedID)
            },
            {
                $set: {
                    patientID: ''
                }
            }
        )
        if(updatedBed){
            await Patient.updateOne(
                {
                    _id: ObjectID(bed.patientID)
                },
                {
                    $set: {
                        status: false
                    }
                }
            )
        }
        res.json({message: `Patient ${patient.name} disconected from Bed ${bed.name}`})
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

module.exports = {
    createPatient,
    connectPatientToBed,
    disconnectPatientToBed
}