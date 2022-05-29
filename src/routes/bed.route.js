const router = require('express').Router();
const { createBed, getBedsByRoom, getBedByID } = require('./../controllers/bed.controller');

router.post('/', createBed);
router.get('/room/:roomID', getBedsByRoom);
router.get('/:bedID', getBedByID);


module.exports = router;