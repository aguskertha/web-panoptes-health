const router = require('express').Router();
const { createRoom, getRooms, getRoomByID } = require('./../controllers/room.controller');

router.post('/', createRoom);
router.get('/', getRooms);
router.get('/:roomID', getRoomByID);

module.exports = router;