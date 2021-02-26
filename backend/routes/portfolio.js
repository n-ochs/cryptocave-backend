const Router = require('express').Router;
const controller = require('../controllers/portfolio');

const router = Router();

//Create
router.post('/create', controller.createPortfolio);

//Read
router.get('/portfolio', controller.portfolio);

//Update
router.post('/add', controller.add);

//Delete
router.post('/delete', controller.remove);

module.exports = router;