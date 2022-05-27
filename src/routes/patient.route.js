const router = require('express').Router();
const { createPatient, connectPatientToBed, disconnectPatientToBed } = require('./../controllers/patient.controller');

router.post('/', createPatient);
router.post('/connect', connectPatientToBed);
router.post('/disconnect', disconnectPatientToBed);

module.exports = router;