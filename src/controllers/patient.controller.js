const Patient = require('./../models/patient.model');

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

module.exports = {
    createPatient
}