//Express Setup
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3100;

//Routes
const authRoutes = require('./routes/auth');
const verifyRoutes = require('./routes/verifyToken');
const watchlistRoutes = require('./routes/watchlist');
const portfolioRoutes = require('./routes/portfolio');

//MongoDB Setup
const db = require('./db');

//Eliminates any CORS issues
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Headers', ['Content-Type', 'Authorization']);
    next();
});

//Extra Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//App
app.get('/', (req, res) => {
    res.send({
        message: "Dev use only."
    });
});

app.use('/', verifyRoutes);

app.use('/', authRoutes);

app.use('/wl', watchlistRoutes);

app.use('/p', portfolioRoutes);

app.listen(PORT, () => {
    db.initDb();
    console.log(`Server started on localhost:${PORT} at: ` +Date());
});