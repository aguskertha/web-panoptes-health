const Doctor = require('./../models/doctor.model')

const createDoctor = async (req, res, next) => {
    try {
        const {name, age, NIP, type, typeName} = req.body
        const newDoctor = new Doctor({name, age, NIP, type, typeName})
        await newDoctor.save()
        res.json({message: 'Doctor created successfully'})
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find()
        res.json(doctors)
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

const deleteDoctors = async (req, res, next) => {
    try {
        await Doctor.deleteMany()
        res.json({message: 'Doctors deleted successfully'})

    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

module.exports = {
    createDoctor,
    getDoctors,
    deleteDoctors
}