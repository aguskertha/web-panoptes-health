const router = require('express').Router();
const { createRoom, getRooms } = require('./../controllers/room.controller');

router.post('/', createRoom);
router.get('/', getRooms);

module.exports = router;