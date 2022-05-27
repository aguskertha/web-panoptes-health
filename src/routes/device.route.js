const router = require('express').Router();
const { registerDevice, connectDeviceToPatient, disconnectDeviceToPatient } = require('./../controllers/device.controller');

router.post('/', registerDevice);
router.post('/connect', connectDeviceToPatient);
router.post('/disconnect', disconnectDeviceToPatient);

module.exports = router;