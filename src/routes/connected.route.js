const router = require('express').Router();
const { renderConnectedPatient } = require('./../controllers/connected.controller');

router.get('/', renderConnectedPatient);

module.exports = router;