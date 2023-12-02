const express = require('express')
const router = express.Router()
const Schemas = require('../models/Schemas.js')

router.post('/studyspaces', async (req, res) => {
    const input = req.body
    const nooks = Schemas.Nooks

    const possibleSpaces = await nooks.find({
        Building: { $regex: `^.*${input.Building}.*$`, $options: 'i' },
    })
    console.log(possibleSpaces)
    try {
        if (possibleSpaces.length > 0) {
            res.status(200).json(possibleSpaces)
        } else {
            res.status(404).json({ message: 'No possible studyspaces' })
        }
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.post('/registerSpace/:id', async (req, res) => {
    const roomId = req.params.id
    console.log('Received request to register to space ' + roomId)
    res.status(200).send('Registration successful')
})

router.post('/sendRating/:id/:value', async (req, res) => {
    const roomId = req.params.id
    const Value = req.params.value
    console.log(`Received rating for ${roomId} with value ${Value}`)
    res.status(200).send('Sent Rating successfully')
})

router.delete('/unregisterSpace/:id', async (req, res) => {
    const roomId = req.params.id
    console.log('Recieved request to unregister for space ' + roomId)
    res.status(200).send('Registration Cancellation successful')
})

router.get('/', async (req, res) => {
    res.send('Hello World!')
})

router.get('/secretPage', async (req, res) => {
    const secretData = { message: 'This is a secret message!' }
    res.json(secretData)
})

module.exports = router
