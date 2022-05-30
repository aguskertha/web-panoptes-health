const router = require('express').Router();
const { createBed, getBedsByRoom, getBedByID, getBedsConnected, deleteBedByID } = require('./../controllers/bed.controller');

router.post('/', createBed);
router.get('/room/:roomID', getBedsByRoom);
router.get('/connected', getBedsConnected);
router.get('/:bedID', getBedByID);
router.delete('/:bedID', deleteBedByID);


module.exports = router;