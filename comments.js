// Create web server
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to handle comment submission
app.post('/submit-comment', (req, res) => {
    const comment = req.body.comment;
    if (comment) {
        // Save comment to a file
        fs.appendFile('comments.txt', comment + '\n', (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(500).send('Server Error');
            }
            res.redirect('/');
        });
    } else {
        res.status(400).send('Bad Request');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
