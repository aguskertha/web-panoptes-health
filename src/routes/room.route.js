const router = require('express').Router();
const { createRoom, getRooms, getRoomByID, deleteRoomByID } = require('./../controllers/room.controller');

router.post('/', createRoom);
router.get('/', getRooms);
router.get('/:roomID', getRoomByID);
router.delete('/:roomID', deleteRoomByID);

module.exports = router;