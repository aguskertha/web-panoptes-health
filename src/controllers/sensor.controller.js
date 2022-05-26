
const createSensorData = async (req, res, next) => {
    try {
        console.log(req.body)
        res.json({message: 'Success'})
    } catch (error) {
        res.json({message: error.message.toString()})
    }
}

module.exports = {
    createSensorData
}