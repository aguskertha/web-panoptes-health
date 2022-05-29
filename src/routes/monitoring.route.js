const router = require('express').Router();
const { renderMonitoringPage, renderGridRooms, renderGridBeds, renderMonitorSensor } = require('./../controllers/monitoring.controller');

router.get('/', renderMonitoringPage);
router.get('/rooms', renderGridRooms);
router.get('/rooms/:roomID', renderGridBeds);
router.get('/rooms/:roomID/beds/:bedID', renderMonitorSensor);

module.exports = router;