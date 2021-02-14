const path = require('path')

const hbs = require('hbs')
const express = require('express')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

const port = process.env.PORT

//Define paths for express config
const publicDirectory = path.join(__dirname,'../public/')
const viewsDirectory= path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Handlebars angine and views location
app.set('view engine','hbs')
app.set('views' , viewsDirectory)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('/',(req,res) =>{
    res.render('index',{
        title : 'Weather App',
        name: 'Harshul'
    })
})

app.get('/about' ,(req,res) =>{
    res.render('about' ,{
        title: "About me",
        name : "Harshul"
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        helpfulText : 'Helpful text',
        title : 'Help',
        name : "Harshul "
    })
})

app.get('/weather' ,(req,res) =>{
  
    const address = req.query.address
    console.log(address)

    if(address){
    geocode(address,(err,{latitude , longitude, address} = {}) =>{
      
        if(!err){
          weather(latitude,longitude,(err,forecast) =>{
            if(!err){
            return res.send({
                address : address,
                location: "Latitude : " + latitude + ", Longitude : " + longitude,
                forecast: forecast
               })
              } else {
             return res.send({error:err})   
             }
           })
          } else {
            return res.send({error:err}) 
        }
      })
    } else {
        res.send({
            error : "Please add the address"
        })
    }
    console.log(req.query)
    
})

app.get('/help/*' ,(req,res) =>{
   
    res.render('404', {
        error : "Help article not found",
        name : "Harshul"
    })
})

app.get('/products' ,(req,res) =>{
    if(!req.query.search) {
        return res.send({
            error: 'Please provide search query'
        })
    }

    res.send({
        products: []
    })

})

app.get('*', (req,res) =>{
    
    res.render('404', {
        error : "Page not found",
        name : "Harshul"
    })
})

app.listen(port ,() =>{
    console.log('Server on port 3000')
})