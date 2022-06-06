const router = require('express').Router();
const sensorRouter = require('./sensor.route');
const deviceRouter = require('./device.route');
const patientRouter = require('./patient.route');
const roomRouter = require('./room.route');
const bedRouter = require('./bed.route');
const dashboardRouter = require('./dashboard.route')
const monitoringRouter = require('./monitoring.route')
const connectedRouter = require('./connected.route')
const userRouter = require('./user.route')
const {ensureAuthenticated} = require('./../middleware/auth');

router.use('/sensors', sensorRouter);
router.use('/devices', deviceRouter);
router.use('/patients', patientRouter);
router.use('/rooms', roomRouter);
router.use('/beds', bedRouter);
router.use('/dashboard', ensureAuthenticated, dashboardRouter);
router.use('/monitoring', ensureAuthenticated, monitoringRouter);
router.use('/connected', ensureAuthenticated, connectedRouter);
router.use('/users', userRouter);

module.exports = router;