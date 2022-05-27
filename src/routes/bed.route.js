const router = require('express').Router();
const { createBed } = require('./../controllers/bed.controller');

router.post('/', createBed);

module.exports = router;