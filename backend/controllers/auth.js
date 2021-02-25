const db = require('../db');
const bcrypt = require('bcryptjs');
const mailgun = require('mailgun-js');
const { createToken } = require('../middleware/jwt');

const DOMAIN = 'sandboxea0b065607344c90a4a281d94924e9a7.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

exports.signup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const pw = req.body.password;

    //Assigns a random number to the user for email verification
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    //Hashing password before storing it in database
    bcrypt
        .hash(pw, 12)
        .then(hashedPW => {
        db.getDb()
            .db()
            .collection('users')
            .insertOne({
                username: username,
                email: email,
                password: hashedPW,
                verification: randomNumber
            })
            .then(result => {
                console.log(result);
                const token = createToken(email);

                const data = {
                    from: 'Crypto Cave <noreply@cryptocave.com>',
                    to: email,
                    subject: 'Please activate your account',
                    html: `
                    <h1>Thank you for signing up for Crypto Cave!</h1>
                    <p>Please activate your account by entering ${randomNumber} on our <a href="https://cryptocave.netlify.app/activation">activation page</a>.</p>
                    `
                };
                mg.messages().send(data, (error, body) => {
                    if (error) console.log(error);
                    else console.log(body);
                });

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
            const token = createToken(email);
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

exports.verifyUser = (req, res, next) => {
    const email = req.body.email;
    const verificationcode = req.body.verificationCode;

    db.getDb().db().collection('users').findOne({email: email})
        .then(userDoc => {
            if (userDoc.verification == verificationcode) {
                return true
            } else false;
        })
        .then(result => {
            if (!result) {
                throw Error();
            };
            res
                .status(200)
                .json({ message: 'Verification successful.' });
        })
        .catch(err => {
            res
                .status(401)
                .json({ message: 'Verification unsuccessful.' })
        });
};