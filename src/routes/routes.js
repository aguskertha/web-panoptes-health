const router = require('express').Router();
const sensorRouter = require('./sensor.route');

router.use('/sensors', sensorRouter);

module.exports = router;