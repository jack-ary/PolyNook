const express = require('express')
const router = express.Router()
const Schemas = require('../models/Schemas.js')

router.post('/registrations', async (req, res) => {
    //find the user with the given email
    const input = req.body
    const users = Schemas.Users
    const nooks = Schemas.Nooks
    console.log("reg point hit")

    const potentials = await users.findOne({
        Email: input.email
    })

    console.log(potentials.SpaceList)
    const rooms = await nooks.find({
        _id: {$in: potentials.SpaceList}
    })

    console.log(rooms)

    res.status(200).json(rooms);
})

router.post('/studyspaces', async (req, res) => {
    const input = req.body
    const nooks = Schemas.Nooks

    const query = buildStudySpacesQuery(input)

    const possibleSpaces = await nooks.find(query)

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

function buildStudySpacesQuery(input)
{
    let query = {
        Building: { $regex: `^.*${input.Building}.*$`, $options: 'i' }
    };
    if (input.hasComputers === 'on') query.Computer = "Yes";
    if (input.major === 'CSC') query.Major = 'CSC';
    if (input.hasUndergraduate === 'on') 
        query.Degree = "Undergrad";
    else if (input.hasGraduate === 'on') 
        query.Degree = "Grad";
    // add null default??
    if (input.Schedule !== "") {
        const [startTime12h, endTime12h] = input.Schedule.split(' - ');
        const startTime24h = convertTo24Hour(startTime12h, 'start');
        const endTime24h = convertTo24Hour(endTime12h, 'end');
        console.log(`start time is: ${startTime24h} and end time ${endTime24h}`)
        query.WeekdayTime = { 
            $all: [`${startTime24h}:10`, `${endTime24h}:10`] 
        };
    }
    return query
}

function convertTo24Hour(time12h, range) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'pm') {
        hours = parseInt(hours, 10) + 12;
    }
    if (range === 'end') {
        hours = parseInt(hours, 10) - 1;
        if (hours < 0) hours = 23;
    }
    return `${hours}`;
}

    // needs col if (input.hasPrinters === 'on') query.hasPrinters = "Yes";
    // needs col if (input.hasScanner === 'on') query.hasScanner = true;
    // needs col if (input.hasPhotocopier === 'on') query.hasPhotocopier = true;

    /* col needs to be renamed
    if (input.airConditioning === 'on') 
        query.AC = "Yes";
    else if (input.noConditioning === 'on') 
        query.AC = "No";
    */

    // when adding more majors add to regex search of db

router.post('/registerSpace/:id', async (req, res) => {
    const roomId = req.params.id
    const email = req.body.email
    const users = Schemas.Users
    console.log('Received request to register to space ' + roomId)

    try {
        let user = await users.findOne({ Email: email });

        if (user) {
            if (!user.SpaceList.includes(roomId)) {
                user.SpaceList.push(roomId);
                await user.save();
            }
        } else {
            user = new users({
                Email: email,
                SpaceList: [roomId]
            });
            await user.save();
        }

        console.log('Received request to register to space ' + roomId);
        res.status(200).send('Registration successful');
    } catch (error) {
        console.error('Error in /registerSpace:', error);
        res.status(500).send('Internal Server Error: Could not register');
    }
});

router.post('/sendRating/:id/:value', async (req, res) => {
    const nooks = Schemas.Nooks
    const ratings = Schemas.Ratings

    const roomId = req.params.id
    const value = req.params.value
    const email = 'test@gmail.com'

    console.log(`Received rating for ${roomId} with value ${value}`)

    try {
        // checking if rating has already existed
        const existingRating = await ratings.findOne({ Email: email, RoomID: roomId });
        if (existingRating) {
            return res.status(200).send('You have already registered a rating.');
            console.log('PREV RATING')
        }else{
            console.log('RATING DOES NOT EXIST')
        }

        // created a new rating
        const newRating = new ratings({ Email: "testt", RoomID: 'roomId', Rating: 3 });
        await newRating.save();

        // fetch all ratings for the specified roomId to calculate the new average
        /*const allRatings = await ratings.find({ RoomID: roomId });
        const totalRatings = allRatings.reduce((acc, curr) => acc + curr.Rating, 0);
        const newAvgRating = totalRatings / allRatings.length;

        // Update the study space with the new average rating
        await nooks.findByIdAndUpdate(roomId, { Rating: newAvgRating });*/

        res.status(200).send(`Rated w/ a ${value}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/unregisterSpace/:id', async (req, res) => {
    const roomId = req.params.id
    console.log('Recieved request to unregister for space ' + roomId)
    res.status(200).send('Registration Cancellation successful')
})

module.exports = {router, convertTo24Hour, buildStudySpacesQuery}
