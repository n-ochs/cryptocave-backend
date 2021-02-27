const Router = require('express').Router;
const controller = require('../controllers/watchlist');

const router = Router();

//Create
router.post('/create', controller.createWatchlist);

//Read
router.get('/watchlist', controller.watchlist);

//Update
router.post('/add', controller.add);

//Delete
router.post('/delete', controller.remove);

module.exports = router;