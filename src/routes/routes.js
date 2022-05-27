const router = require('express').Router();
const sensorRouter = require('./sensor.route');
const deviceRouter = require('./device.route');
const patientRouter = require('./patient.route');

router.use('/sensors', sensorRouter);
router.use('/devices', deviceRouter);
router.use('/patients', patientRouter);

module.exports = router;