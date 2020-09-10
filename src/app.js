const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express  
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setting static warehouse
app.use(express.static(publicDirectory))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Klift'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Klift'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help page',
        title: 'Help',
        name: 'Klift'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    } 

    console.log(req.query.kuku)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "Address must be provided"
        })
    }

    geocode(req.query.address, (error, location) => {

        if(error) {
            return res.send({
                error
            })
        }

        forecast(location.latitude, location.longitude, (error, result) => {

            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                place: location.location,
                forecast: result
            })
        })

    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: '404',
        name: 'Klift'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Klift'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})