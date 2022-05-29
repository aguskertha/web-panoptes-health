const router = require('express').Router();
const { createPatient, connectPatientToBed, disconnectPatientToBed, getPatients, getPatientByID, getPatientsPagination, getAvailablePatients } = require('./../controllers/patient.controller');

router.post('/', createPatient);
router.get('/', getPatients);
router.get('/available', getAvailablePatients);
router.get('/pagination', getPatientsPagination);
router.get('/:patientID', getPatientByID);
router.post('/connect', connectPatientToBed);
router.post('/disconnect', disconnectPatientToBed);

module.exports = router;