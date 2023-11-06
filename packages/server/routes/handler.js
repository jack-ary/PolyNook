const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

router.post('/studyspaces', async (req, res) =>{

    const input = req.body;
    const nooks = Schemas.Nooks;

    const possibleSpaces = await nooks.find(
        { 
            Building: { $regex: `^.*${input.Building}.*$`, $options: 'i' }
        }
    );
    console.log(possibleSpaces);
    try{
        if (possibleSpaces.length > 0){
            res.status(200).json(possibleSpaces);
        } else {
            res.status(404).json({ message: 'No possible studyspaces' });
        }
    } catch (error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/",async (req, res) => {
    res.send("Hello World!");
});

router.get('/secretPage',async (req, res) => {
    const secretData = { message: 'This is a secret message!' };
    res.json(secretData);
});

module.exports = router;