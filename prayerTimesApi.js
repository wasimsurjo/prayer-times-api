const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/prayer-times', async (req, res) => {
    let { city, country } = req.query;
    if (!city || !country) {
        city = 'London';
        country = 'UK';
    }
    try {
        const response = await axios.get('http://api.aladhan.com/v1/timingsByCity', {
            params: { city, country, method: 2 }
        });

        console.log('API Response:', response.data);  // Log the API response

        const timings = response.data.data.timings;
        console.log('Raw Timings:', timings);  // Log the raw timings

        res.json({ city, country, times: timings });
    } catch (error) {
        console.error('Error fetching prayer times:', error);  // Log errors
        res.status(500).json({ error: 'Error fetching prayer times' });
    }
});

app.get('/prayer-times/web', async (req, res) => {
    let { city, country } = req.query;
    if (!city || !country) {
        city = 'London';
        country = 'UK';
    }
    try {
        const response = await axios.get('http://api.aladhan.com/v1/timingsByCity', {
            params: { city, country, method: 2 }
        });

        console.log('API Response:', response.data);  // Log the API response

        const timings = response.data.data.timings;
        console.log('Raw Timings:', timings);  // Log the raw timings

        res.render('prayer-times', { city, country, times: timings });
    } catch (error) {
        console.error('Error fetching prayer times:', error);  // Log errors
        res.status(500).json({ error: 'Error fetching prayer times' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
