const Router = require('express').Router;
const controller = require('../controllers/verifyToken');

const router = Router();

router.post('/verifyToken', controller.verify);

module.exports = router;