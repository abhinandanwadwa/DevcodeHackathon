const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
// const connectToMongo = require('./db');
const app = express();

const PORT = 8181;
// connectToMongo();

// Middlewares
app.use(cors());
app.use(express.json({
    limit: '5.5mb'
}));

// Routes
app.get('/', (req, res) => {
    res.send('Hi!');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/project', require('./routes/project'));

const options = {
    key: fs.readFileSync('ssl/privkey.pem'),
    cert: fs.readFileSync('ssl/cert.pem')
  };
  
  https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Hello World!\n');
  }).listen(8181);