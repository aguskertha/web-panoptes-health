const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});

const renderConnectedPatient = async (req, res, next) => {
    try {

        const beds  = await axios.get('/beds/connected');
        
        res.render('Connected/connected', {
            layout: 'layouts/main-layout',
            beds: beds.data
        })
    } catch (error) {
        
    }
}

module.exports = {
    renderConnectedPatient
}