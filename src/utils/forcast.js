const request=require('request')

const forecast=(lattitude,longitude, callback)=>{

    const url='https://api.darksky.net/forecast/427d409f9103f52000fc7cb8ec984419/'+longitude+',' +lattitude+'?units=si'
    request({url: url, json: true}, (error, response)=>{
            if (error){
                callback('No internet connection', undefined)
            }
            else if (response.body.error){
                callback('No defined location', undefined)
            }
            else 
            {

                callback(undefined, `${response.body.daily.data[0].summary}. It is currently ${response.body.currently.temperature} degree out. There is ${response.body.currently.precipProbability} % chance of rain`)
            }
    }
    )
}

module.exports=forecast