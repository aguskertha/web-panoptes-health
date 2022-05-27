const router = require('express').Router();
const { createPatient } = require('./../controllers/patient.controller');

router.post('/', createPatient);

module.exports = router;