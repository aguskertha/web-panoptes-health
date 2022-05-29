const router = require('express').Router();
const { renderMonitoringPage, renderGridRooms, renderGridBeds, renderMonitorSensor, renderConnectPatient, renderConnectDevice } = require('./../controllers/monitoring.controller');

router.get('/', renderMonitoringPage);
router.get('/rooms', renderGridRooms);
router.get('/rooms/:roomID', renderGridBeds);
router.get('/rooms/:roomID/beds/:bedID', renderMonitorSensor);
router.get('/rooms/:roomID/beds/:bedID/patient/', renderConnectPatient);
router.get('/rooms/:roomID/beds/:bedID/device/', renderConnectDevice);

module.exports = router;