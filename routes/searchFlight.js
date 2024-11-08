const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Handle flight search
router.post('/searchFlights', async (req, res) => {
    const { from, to, passengers, date } = req.body;

    try {
        const response = await axios.get(`http://api.aviationstack.com/v1/flights`, {
            params: {
                limit: 10,
                access_key: "7e4fc1685483105b73f95fdeae537399",
                flight_status: "scheduled",                
                flight_date: date               
            }                
        });

        const flights = response.data.data;
        //console.log(flights)    
        res.render('flightDetails', { flights });
    } catch (error) {
        const response = await axios.get(`http://localhost:3000/data/flights`, {
            params: {
                flight_status: "scheduled"                      
            }                
        });

        // Filter the flights based on date, from, and to parameters
        const flights = response.data.data.filter(flight => {
            //console.log(flight)
            const flightDate = new Date(flight.flight.departure.scheduled).toISOString().split('T')[0]; // Extracting date
            console.log(flightDate, date, flight.flight.departure.airport, from, flight.flight.airport, to)
            return (
                flightDate === date &&               // Check if the flight date matches
                flight.flight.departure.airport === from && // Check departure airport
                flight.flight.arrival.airport === to       // Check arrival airport
            );
        });
        
        //console.log(flights)    
        res.render('flightDetails', { flights, from, to });
    }
});

module.exports = router;