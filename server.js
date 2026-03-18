const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home Page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle URL browsing
app.post('/browse', async (req, res) => {
    let url = req.body.url;

    // Add http if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }

    try {
        const response = await axios.get(url);

        res.send(`
            <html>
            <head>
                <title>Mini Browser</title>
            </head>
            <body>
                <h2>Browsing: ${url}</h2>
                <div>${response.data}</div>
            </body>
            </html>
        `);

    } catch (error) {
        res.send(`
            <h2 style="color:red;">Invalid URL or Unable to Fetch Content</h2>
            <a href="/">Go Back</a>
        `);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});