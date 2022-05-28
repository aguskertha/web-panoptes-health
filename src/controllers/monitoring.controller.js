
const renderMonitoringPage = async (req, res, next) => {
    try {
        res.render('Monitoring/monitor-sensor', {
            layout: 'layouts/main-layout',
        })
    } catch (error) {
        
    }
}


module.exports = {
    renderMonitoringPage
}