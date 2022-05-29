const Room = require('./../models/room.model')
const ObjectID = require('mongodb').ObjectId;

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

const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.json(rooms)
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

const getRoomByID = async (req, res, next) => {
    try {
        const roomID = req.params.roomID;
        const room = await Room.findOne({_id: ObjectID(roomID)})
        if(!room){
            throw 'Room not found!'
        }
        res.json(room)
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

module.exports = {
    createRoom,
    getRooms,
    getRoomByID
}