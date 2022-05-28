const router = require('express').Router();
const { createSensorData, deleteSensors, getSensors, getSensorsByBed, getDummyData, getSensorMonitorByBed } = require('./../controllers/sensor.controller');

router.post('/', createSensorData);
router.get('/', getSensors);
router.get('/dummy', getDummyData);
router.get('/bed/:bedID', getSensorsByBed);
router.get('/bed/monitor/:bedID', getSensorMonitorByBed);
router.delete('/', deleteSensors);

module.exports = router;