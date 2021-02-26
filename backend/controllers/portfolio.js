const db = require('../db');
const { verifyToken } = require('../middleware/jwt');

//Create
exports.createPortfolio = (req, res, next) => {
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    const { email } = payload;
    
        db.getDb()
            .db()
            .collection('portfolio')
            .insertOne({
                email: email,
                coins: []
            })
            .then(() => {
                res
                    .status(200)
                    .json({ message: "Successfully created a portfolio." });
            })
            .catch(() => {
                res
                    .status(400)
                    .json({ message: "Error creating portfolio." });
            });
};

//Read
exports.portfolio = (req, res, next) => {
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    const { email } = payload;

    db.getDb()
        .db()
        .collection('portfolio')
        .findOne(
            {email: email}
        )
        .then((userWatchlist) => {
            res
                .status(200)
                .json(userWatchlist.coins);
        })
        .catch(() => {
            res
                .status(401)
                .json({ message: "Error finding user's portfolio." });
        });
};

// //Update
// exports.add = (req, res, next) => {

// };

// //Delete
// exports.delete = (req, res, next) => {

// };