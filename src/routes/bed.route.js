const router = require('express').Router();
const { createBed, getBedsByRoom } = require('./../controllers/bed.controller');

router.post('/', createBed);
router.get('/:roomID', getBedsByRoom);

module.exports = router;