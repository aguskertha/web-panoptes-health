const router = require('express').Router();
const { renderMonitoringPage } = require('./../controllers/monitoring.controller');

router.get('/', renderMonitoringPage);

module.exports = router;