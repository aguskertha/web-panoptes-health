const Doctor = require('./../models/doctor.model')
const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});

const specialists = [
    'JANTUNG',
    'SYARAF',
    'PENYAKIT DALAM',
    'BEDAH',
    'ANAK',
    'THT',
    'MATA',
    'GIGI'
]

const registerDoctorPage = async (req, res, next) => {
    try {
        const {name, age, NIP, type, typeName} = req.body
        const result = await axios.post('/doctors', {name, age, NIP, type, typeName});
        const doctors = await Doctor.find()
        if(result.status == 200){
            res.render('Doctor/doctor-page', {
                layout: 'layouts/main-layout',
                doctors
            })
        }
    } catch (error) {
        res.render('Doctor/create', {
            layout: 'layouts/main-layout',
            specialists,
        })
    }
}

const renderDoctorPage = async (req, res, next) => {
    try {
        const doctors = await Doctor.find()

        res.render('Doctor/doctor-page', {
            layout: 'layouts/main-layout',
            doctors
        })
    } catch (error) {
        
    }
}
const renderCreateDoctorPage = async (req, res, next) => {
    try {

        res.render('Doctor/create', {
            layout: 'layouts/main-layout',
            specialists
        })
    } catch (error) {
        
    }
}

module.exports = {
    renderCreateDoctorPage,
    renderDoctorPage,
    registerDoctorPage
}