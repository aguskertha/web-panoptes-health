const router = require('express').Router();
const { createRoom } = require('./../controllers/room.controller');

router.post('/', createRoom);

module.exports = router;