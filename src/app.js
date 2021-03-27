const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forcast= require('./utils/forcast')
const port= process.env.PORT || 3000

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.set('views',path.join(__dirname, '../templates/views'))
app.set('view engine', 'hbs')
const partialpath= path.join(__dirname,'../templates/partials')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialpath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Faim Tonmoy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Faim Tonmoy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Faim Tonmoy'

    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
       return res.send({
            error:"You need to set an address."
        })
    }
    else{
        geocode(req.query.address, (error, {latitude,longitude,location}={})=>{
          if(error)
          {
            return res.send({error})
          }
        
        forcast(latitude,longitude,(error,forcastdata)=>{
          if(error)
          {
            return res.send({error})
        
          }
          res.send({
          location: location,
          forcastdata: forcastdata,

          })
        })
      })
     }
    })

app.get('/help/*', (req,res)=>{
    res.render('error',{
        title: 404,
        message: 'Help Article not found',
        name:'Faim Tonmoy'
    })
})

app.get('*', (req,res)=>{
    res.render('error',{
        title: 404,
        message:'Page not found',
        name: 'Faim Tonmoy'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})