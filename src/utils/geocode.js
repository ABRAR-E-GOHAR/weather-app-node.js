const request=require('request')
const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hhaGJhejA0NjIiLCJhIjoiY2szdTEyeDU5MDg0bTNsbzFueGoyOXZidSJ9.80hH8Coz1ixeKkveH6A8YA'
    request({url: url, json:true}, (error,response)=>{
        if (error){
            callback('Unable to connect to location services', undefined)
        }
    else if (response.body.features.length===0){
        callback('No find location. Search another', undefined)
    }    
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                 longitude: response.body.features[0].center[1],
                 placename: response.body.features[0].place_name
            })
        }
        
    }
    )
    }

    module.exports=geocode