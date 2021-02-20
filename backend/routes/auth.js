const Router = require('express').Router;
const controller = require('../controllers/auth');

const router = Router();

router.post('/signup', controller.signup);

router.post('/login', controller.login);

module.exports = router;