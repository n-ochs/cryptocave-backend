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

//Update - check if coin already exists. if not, create new. if it does, only update the value.
exports.add = (req, res, next) => {
    const newCoin = req.body.newCoin.toUpperCase();
    const quantity = req.body.quantity;
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    const { email } = payload;

    // Checking to see if the coin already exists in the users portfolio.
    const noDuplicates = (data) => {
        let verify = [];
        data.coins.forEach((coin) => {
            if (coin.coin == newCoin) {
                verify.push("x")
            }
        })
        return verify;
    };

    db.getDb().db().collection('portfolio').findOne({email: email})
        .then((result) => {
            if (noDuplicates(result).length == 0) {
                db.getDb()
                    .db()
                    .collection('portfolio')
                    .updateOne(
                        {email: email}, 
                        {$push: {coins: 
                            {coin: newCoin, quantity: quantity}
                        }}
                    )
                    .then(() => {
                        res
                            .status(200)
                            .json({ message: `Successfully added ${quantity} ${newCoin} to portfolio.` });
                    })
                    .catch(() => {
                        res
                            .status(401)
                            .json({ message: `Error adding ${quantity} ${newCoin} to portfolio.` });
                    });
            } else if (noDuplicates(result).length == 1) {
                db.getDb()
                    .db()
                    .collection('portfolio')
                    .updateOne(
                        {email: email, "coins.coin": newCoin},
                        {$inc: {"coins.$.quantity": quantity}},
                    )
                    .then(() => {
                        res
                            .status(200)
                            .json({ message: `Successfully added ${quantity} ${newCoin} to portfolio.` });
                    })
                    .catch(() => {
                        res
                            .status(400)
                            .json({ message: `Error adding ${quantity} ${newCoin} to portfolio.` });
                    })
            } else {
                throw Error();
            };
        })
        .catch(() => {
            res
            .status(401)
            .json({ message: `Error adding ${quantity} ${newCoin} to portfolio.` });
        });
};

// //Delete
// exports.delete = (req, res, next) => {

// };