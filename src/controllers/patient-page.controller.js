// const Patient = require('./../models/patient.model')
// const Doctor = require('./../models/doctor.model')
const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});

const registerPatientPage = async (req, res, next) => {
    try {
        const {name, NIK, age, bornDate, address, contact, doctorID} = req.body
        const result = await axios.post('/patients', {name, NIK, age, bornDate, address, contact, doctorID});
        const patients = await axios.get('/patients')
        
        if(result.status == 200){
            res.render('Patient/patient-page', {
                layout: 'layouts/main-layout',
                patients: patients.data
            })
        }
    } catch (error) {
        res.render('Patient/create', {
            layout: 'layouts/main-layout',
        })
    }
}

const renderCreatePatientPage = async (req, res, next) => {
    try {
        // const doctors = await Doctor.find()
        const doctors = await axios.get('/doctors')
        res.render('Patient/create', {
            layout: 'layouts/main-layout',
            doctors: doctors.data
        })
    } catch (error) {
        
    }
}

const renderPatientPage = async (req, res, next) => {
    try {
        const patients = await axios.get('/patients')
        res.render('Patient/patient-page', {
            layout: 'layouts/main-layout',
            patients: patients.data
        })
    } catch (error) {
        
    }
}

module.exports = {
    renderPatientPage,
    registerPatientPage,
    renderCreatePatientPage
}