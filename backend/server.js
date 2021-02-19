//Express Setup
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3100

//Routes
const authRoutes = require('./routes/auth');

//MongoDB Setup
const db = require('./db');

//Eliminates any CORS issues
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/ping', (req, res) => {
    res.send({
        message: "pong"
    });
});
app.use('/', authRoutes);

db.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('DB connected!');
        app.listen(PORT);
    };
});