const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});

const renderMonitoringPage = async (req, res, next) => {
    try {
        res.render('Monitoring/monitor-sensor', {
            layout: 'layouts/main-layout',
        })
    } catch (error) {
        
    }
}

const renderGridRooms = async (req, res, next) => {
    try {
        const rooms = await axios.get('/rooms')
        const column = 3;
        const row = Math.ceil((rooms.data.length/column))
        const getData  = async (bedData) => {
            let bed = await JSON.parse(JSON.stringify(bedData));
                
            let device ={}
            if(bed.deviceID !== ''){
                device = await axios.get('/devices/'+bed.deviceID); 
            }
            let patient ={}
            if(bed.patientID !== ''){
                patient = await axios.get('/patients/'+bed.patientID); 
            }
            bed.device = device.data;
            bed.patient = patient.data;
            return bed
        }

        const getBedsByRoom = async (roomData) => {
            const room = await JSON.parse(JSON.stringify(roomData));
            const bedsFilter = await axios.get('/beds/room/'+room._id);
            let promises = []
            bedsFilter.data.forEach(async (bedData) => {
                promises.push(getData(bedData))
            });

            const beds = await Promise.all(promises)
            
            const newRoom = {
                room,
                beds: beds
            }
            return newRoom
        }

        let promises = []
        rooms.data.forEach(room => {
            promises.push(getBedsByRoom(room))
        });

        const data = await Promise.all(promises)
        res.render('Monitoring/room-plot', {
            layout: 'layouts/main-layout',
            column,
            row,
            rooms: data,
        })
    } catch (error) {
        
    }
}

const renderGridBeds = async (req, res, next) => {
    try {
        const roomID = req.params.roomID
        const beds = await axios.get('/beds/room/'+roomID)
        const room = await axios.get('/rooms/'+roomID)
        const column = 3;
        const row = Math.ceil((beds.data.length/column))
        res.render('Monitoring/bed-plot', {
            layout: 'layouts/main-layout',
            column,
            beds: beds.data,
            row,
            room: room.data
        })
    } catch (error) {
        
    }
}
const renderMonitorSensor = async (req, res, next) => {
    try {
        const bedID = req.params.bedID
        const roomID = req.params.roomID
        const bed = await axios.get('/beds/'+bedID)
        const room = await axios.get('/rooms/'+roomID)
        
        res.render('Monitoring/monitor-sensor', {
            layout: 'layouts/main-layout',
            bedID,
            bed: bed.data,
            room: room.data
        })
    } catch (error) {
        
    }
}

const renderConnectPatient = async (req, res, next) => {
    try {
        const bedID = req.params.bedID
        const roomID = req.params.roomID
        const patients = await axios.get('/patients/available')
        const room = await axios.get('/rooms/'+roomID)
        const bed = await axios.get('/beds/'+bedID)

        res.render('Monitoring/connect-patient', {
            layout: 'layouts/main-layout',
            bedID,
            roomID,
            patients: patients.data,
            room: room.data,
            bed: bed.data,
        })
    } catch (error) {
        
    }
}

const renderConnectDevice = async (req, res, next) => {
    try {
        const bedID = req.params.bedID
        const roomID = req.params.roomID
        const room = await axios.get('/rooms/'+roomID)
        const bed = await axios.get('/beds/'+bedID)
        const devices = await axios.get('/devices/available')
        
        res.render('Monitoring/connect-device', {
            layout: 'layouts/main-layout',
            bedID,
            roomID,
            devices: devices.data,
            room: room.data,
            bed: bed.data,
        })
    } catch (error) {
        
    }
}

module.exports = {
    renderMonitoringPage,
    renderGridRooms,
    renderGridBeds,
    renderMonitorSensor,
    renderConnectPatient,
    renderConnectDevice
}