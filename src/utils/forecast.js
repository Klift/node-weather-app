const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=0ea8e092e4e68fdded0ba3b7c0fa62fc&query=${latitude},${longitude}` 

    request({url, json: true}, (error, {body}) => {

        if(error) {
            callback('Unable to connect to forecast services')
        } else if(body.error) {
            callback('Unable to find the specified location')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '\n'
                                + 'Temperature: ' + body.current.temperature + ' degrees.\n'
                                + 'Feels like: ' + body.current.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast