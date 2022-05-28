const router = require('express').Router();
const { renderDashboardPage } = require('./../controllers/dashboard.controller');

router.get('/', renderDashboardPage);

module.exports = router;