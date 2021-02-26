const Router = require('express').Router;
const controller = require('../controllers/watchlist');

const router = Router();

router.post('/create', controller.createWatchlist);

router.post('/add', controller.add);

router.post('/delete', controller.remove);

module.exports = router;