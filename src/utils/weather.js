const request = require('request')
const geocode = require('./geocode')

const weather = (latitude,longitude,callback) => {
  
     const url = "http://api.weatherstack.com/current?access_key=bafc7badd4439cfbc75e72a97c2f3797&query="+latitude+","+longitude
      
      request({ url : url , json : true},(error,{body} = {}) =>{
        if(error){
           callback('Unable to connect to the weather service')
        } else if (body.error) {
           callback('Unable to find the location',undefined)
        } else {
          const weather = body.current.weather_descriptions + " today \nwith current temperature " +body.current.temperature   
          callback(undefined,weather)
         }
       })      

  }

  module.exports = weather