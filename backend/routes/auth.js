const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = Router();
const controller = require('../controllers/auth');

const createToken = () => {
    return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1h' });
};

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const pw = req.body.password;
    db.getDb().db().collection('users').findOne({email: email})
        .then(userDoc => {
            return bcrypt.compare(pw, userDoc.password);
        })
        .then(result => {
            if (!result) {
                throw Error();
            };
            const token = createToken();
            res
                .status(200)
                .json({
                    message: 'Authentication succeeded',
                    token: token
                });
        })
        .catch(err => {
            res
                .status(401)
                .json({ message: 'Authentication failed, invalid username or password.' });
        });
});

router.post('/signup', controller.signup);

module.exports = router;