const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const positionRoutes = require('./routes/position')
const orderRoutes = require('./routes/order')
const analyticsRoutes = require('./routes/analytics')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI)
    .then(res => {
        console.log('Mongo DB connected')
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/analytics', analyticsRoutes)


module.exports = app
