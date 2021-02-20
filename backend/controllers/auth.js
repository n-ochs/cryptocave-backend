const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = () => {
    return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const pw = req.body.password;

    //Hashing password before storing it in database
    bcrypt
        .hash(pw, 12)
        .then(hashedPW => {
        db.getDb()
            .db()
            .collection('users')
            .insertOne({
                email: email,
                password: hashedPW
            })
            .then(result => {
                console.log(result);
                const token = createToken();
                res
                    .status(201)
                    .json({ token: token, user: { email: email } });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ message: 'Creating the user failed. Email may already be in use.' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Creating the user failed.' });
        });
};

exports.login = (req, res, next) => {
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
};