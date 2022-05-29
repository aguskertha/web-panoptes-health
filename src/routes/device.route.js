const router = require('express').Router();
const { registerDevice, disconnectDeviceToBed, connectDeviceToBed, getDevices, getDeviceByID, getAvailableDevices } = require('./../controllers/device.controller');

router.post('/', registerDevice);
router.get('/', getDevices);
router.get('/available', getAvailableDevices);
router.get('/:deviceID', getDeviceByID);
router.post('/connect', connectDeviceToBed);
router.post('/disconnect', disconnectDeviceToBed);

module.exports = router;