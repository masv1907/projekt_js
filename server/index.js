const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

// Hantera production 
if (process.env.NODE_ENV === 'production') {
    // Statisk mapp 
    app.use(express.static(__dirname + '/public/'));

    // Hantera single-page-application (SPA)
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Servern startad på port ${port}`));