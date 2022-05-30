const Bed = require('../models/bed.model');
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

const deleteRoomByID = async (req, res, next) => {
    try {
        const roomID = req.params.roomID
        const room = await Room.findOne({_id: roomID})
        if(!room){
            throw 'Room not found!'
        }
        const beds = await Bed.find({roomID})
        if(beds.length == 0){
            await Room.deleteOne({_id: ObjectID(roomID)})
            return res.json({message: 'Room deleted successfully'})
        }
        let isConnect = false
        beds.forEach(bed => {
            if(bed.patientID !== '' || bed.deviceID !== ''){
                isConnect = true
            }
        });

        if(isConnect){
            throw ''
        }
        await Bed.deleteMany({roomID})
        await Room.deleteOne({_id: ObjectID(roomID)})
        res.json({message: 'Room deleted successfully'})
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

module.exports = {
    createRoom,
    getRooms,
    getRoomByID,
    deleteRoomByID
}