const Router = require('express').Router;
const controller = require('../controllers/auth');

const router = Router();

router.post('/signup', controller.signup);

router.post('/login', controller.login);

router.post('/activate', controller.verifyUser);

module.exports = router;