const router = require('express').Router();
const { createDoctor, getDoctors, deleteDoctors } = require('./../controllers/doctor.controller');

router.post('/', createDoctor);
router.get('/', getDoctors);
router.delete('/', deleteDoctors);

module.exports = router;