const router = require('express').Router();
const { createSensorData, deleteSensors, getSensors, getSensorsByBed } = require('./../controllers/sensor.controller');

router.post('/', createSensorData);
router.get('/', getSensors);
router.get('/bed/:bedID', getSensorsByBed);
router.delete('/', deleteSensors);

module.exports = router;