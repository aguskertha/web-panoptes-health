const router = require('express').Router();
const { createSensorData, deleteSensors, getSensors } = require('./../controllers/sensor.controller');

router.post('/', createSensorData);
router.get('/', getSensors);
router.delete('/', deleteSensors);

module.exports = router;