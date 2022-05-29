const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});


const renderDashboardPage = async (req, res, next) => {
    try {
        const patients = await axios.get('/patients');
        const devices = await axios.get('/devices');
        const rooms = await axios.get('/rooms');

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

        res.render('Dashboard/dashboard', {
            layout: 'layouts/main-layout',
            patients: patients.data,
            devices: devices.data,
            rooms: data,
        })
    } catch (error) {
        res.status(400).json({message: error.toString()});
    }
}

module.exports = {
    renderDashboardPage
}