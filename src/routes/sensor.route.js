const router = require('express').Router();
const { createSensorData } = require('./../controllers/sensor.controller');

router.post('/', createSensorData);

module.exports = router;