//create proxy

const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); //use import as fetch works on ES6

const app = express();
app.use(cors());

app.get('/api/proxy', async (req, res) => {
    try {
        const response = await fetch('https://api.jsonserve.com/Uw5CrX');
        const data = await response.json();
        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
