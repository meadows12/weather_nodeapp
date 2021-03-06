const request = require('postman-request')

const forecast = (longitude,latitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=cec95c73b5df8dcaf3609d308ac217c7&query=' + latitude + ',' + longitude + '&units=f'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect',undefined)
        }else if(body.error){
            callback('Undefined location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] + ".It is currently " + body.current.temperature + " degrees Farenheit out.But it feels like " + body.current.feelslike + " Farenheit.The humidity is " + body.current.humidity + "%")
        }
    })
}

module.exports = forecast