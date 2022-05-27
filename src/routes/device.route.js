const router = require('express').Router();
const { registerDevice, disconnectDeviceToBed, connectDeviceToBed } = require('./../controllers/device.controller');

router.post('/', registerDevice);
router.post('/connect', connectDeviceToBed);
router.post('/disconnect', disconnectDeviceToBed);

module.exports = router;