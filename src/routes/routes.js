const router = require('express').Router();
const sensorRouter = require('./sensor.route');
const deviceRouter = require('./device.route');
const patientRouter = require('./patient.route');
const roomRouter = require('./room.route');
const bedRouter = require('./bed.route');

router.use('/sensors', sensorRouter);
router.use('/devices', deviceRouter);
router.use('/patients', patientRouter);
router.use('/rooms', roomRouter);
router.use('/beds', bedRouter);

module.exports = router;