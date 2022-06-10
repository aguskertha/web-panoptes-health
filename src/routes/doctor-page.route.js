const router = require('express').Router();
const {renderDoctorPage, renderCreateDoctorPage, registerDoctorPage } = require('./../controllers/doctor-page.controller');

router.get('/', renderDoctorPage);
router.get('/create', renderCreateDoctorPage);
router.post('/create', registerDoctorPage);

module.exports = router;