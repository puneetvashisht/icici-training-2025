// express routes
const express = require('express');
const router = express.Router();
const Trip = require('../schemas/Trip');
const Itinerary = require('../schemas/Itinerary');
const advancedResults = require('../middlewares/advancedResults');

// router.get('/trips', async (req, res) => {
//     const trips = await Trip.find();
//     res.json(trips);
// });

router.get('/trips', advancedResults(Trip), async (req, res) => {
    // const trips = await Trip.find();
    // res.json(trips);
    res.json(res.advancedResults);
});


router.get('/trips/search/:title', async (req, res) => {
    const { title } = req.params;
    //case insensitive search
    const trips = await Trip.findOne({ title: { $regex: title, $options: 'i' } });
    res.json(trips);
});

router.get('/trips/:id', async (req, res) => {
    const { id } = req.params;
    const trip = await Trip.findById(id);
    //load itineraries
    await trip.populate('itineraries');
    // load activities for each itinerary
    for (let itinerary of trip.itineraries) {
        await itinerary.populate('activities');
    }
    res.json(trip);
});



router.post('/trips', async (req, res) => {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).json(newTrip);
});

router.delete('/trips/:id', async (req, res) => {
    const { id } = req.params;
    await Trip.findByIdAndDelete(id);
    res.status(204).send();
});

router.patch('/trips/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTrip);
});


//add itinerary to trip
router.post('/trips/:tripId/itinerary', async (req, res) => {
    const { tripId } = req.params;
   
    const newItinerary = new Itinerary(req.body);
    await newItinerary.save();
    
    const trip = await Trip.findById(tripId);
    trip.itineraries.push(newItinerary._id);
    await trip.save();
    res.status(201).json(newItinerary);
})

module.exports = router;

