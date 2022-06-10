const router = require('express').Router();
const { renderPatientPage, registerPatientPage, renderCreatePatientPage } = require('./../controllers/patient-page.controller');

router.get('/', renderPatientPage);
router.post('/create', registerPatientPage);
router.get('/create', renderCreatePatientPage);

module.exports = router;