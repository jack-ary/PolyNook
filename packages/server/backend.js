const express = require('express')
const bodyParser = require('body-parser')
const routesHandler = require('./routes/handler.js')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv/config')

const app = express()
const port = process.env.PORT || 8000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())
app.use('/', routesHandler)

mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('CHECK ONE: \nDB Connected!')
    })
    .catch((err) => {
        console.log(err)
    })

const db = mongoose.connection
db.on('open', async () => {
    console.log('CHECK TWO:')
    try {
        const collectionExists = mongoose.model('study_spaces')
        if (collectionExists) {
            console.log('it exists.')
        } else {
            console.log('it does not exist.')
        }
    } catch (error) {
        console.error('Error:', error)
    }
})

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
