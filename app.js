const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const positionRoutes = require('./routes/position')
const orderRoutes = require('./routes/order')
const analyticsRoutes = require('./routes/analytics')
const app = express()

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
