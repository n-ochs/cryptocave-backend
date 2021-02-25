const Router = require('express').Router;
const controller = require('../controllers/watchlist');

const router = Router();

router.post('/create', controller.createWatchlist);

module.exports = router;