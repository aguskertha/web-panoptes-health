const Room = require('./../models/room.model')

const createRoom = async (req, res, next) => {
    try {
        const {name} = req.body;
        const room  = {name};
        const newRoom = new Room(room);
        await newRoom.save()
        res.json({message: 'Room created successfully'})
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

module.exports = {
    createRoom
}