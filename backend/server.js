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

//Middleware
const { verifyToken } = require('./middleware/jwt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send({
        message: "Dev use only."
    });
});

app.post('/verifyToken', (req, res) => {
    console.log(verifyToken(req.body.token));
});

app.use('/', authRoutes);

app.listen(PORT, () => {
    db.initDb();
    console.log(`Server started on localhost:${PORT} at: ` +Date());
});