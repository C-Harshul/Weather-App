const request = require("request")


const geocoding = (place,callback) => {
   
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(place)+".json?access_token=pk.eyJ1IjoiYy1oYXJzaHVsIiwiYSI6ImNra3Y3ZHZ0YzFwM24ycXBmZmo4ZjFwZWoifQ.w0ScAXAvicNA4HBUBoKHrQ&limit=1"
    request({ url : url, json: true} ,(error,{body} = {}) =>{
      if(error || body.features === undefined){
        callback("Unable to connect to the geocoding API",undefined,undefined,undefined)
      } else if(body.features.length === 0 ){
        callback('Place not found',undefined,undefined,undefined)
      } else {
        const data = {
            'latitude' : body.features[0].center[1],
            'longitude': body.features[0].center[0],
            'address' : body.features[0].place_name
        }
        callback(undefined,data)
      }
    })
    
  }

  module.exports = geocoding