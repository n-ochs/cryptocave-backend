const db = require('../db');
const { verifyToken } = require('../middleware/jwt');

//Create
exports.createWatchlist = (req, res, next) => {
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    const { email } = payload;
    
        db.getDb()
            .db()
            .collection('watchlist')
            .insertOne({
                email: email,
                coins: []
            })
            .then(() => {
                res
                    .status(200)
                    .json({ message: "Successfully created a watchlist." });
            })
            .catch(() => {
                res
                    .status(400)
                    .json({ message: "Error creating watchlist." });
            });
};

//Read
exports.watchlist = (req, res, next) => {
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    const { email } = payload;

    db.getDb()
        .db()
        .collection('watchlist')
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
                .json({ message: "Error finding user's watchlist." });
        });
};

//Update
exports.add = (req, res, next) => {
    const newCoin = req.body.newCoin;
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    const { email } = payload;

    db.getDb().db().collection('watchlist').findOne({email: email, coins: {coin: newCoin}})
        .then((result) => {
            if (result == null) {
                db.getDb()
                    .db()
                    .collection('watchlist')
                    .updateOne(
                        {email: email}, 
                        {$push: {coins: {coin: newCoin}}}
                    )
                    .then(() => {
                        res
                            .status(200)
                            .json({ message: `Successfully added ${newCoin} to watchlist.` });
                    })
                    .catch(() => {
                        res
                            .status(401)
                            .json({ message: `Error adding ${newCoin} to watchlist.` });
                    });
            } else throw Error();
        })
        .catch(() => {
            res
            .status(401)
            .json({ message: "Coin already exists in watchlist." });
        });
};

//Delete
exports.remove = (req, res, next) => {
    const deletedCoin = req.body.deletedCoin;
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    const { email } = payload;

    db.getDb().db().collection('watchlist').findOne({email: email, coins: {coin: deletedCoin}})
        .then((result) => {
            if (result == null) {
                throw Error()
            } else {
                db.getDb()
                    .db()
                    .collection('watchlist')
                    .updateOne(
                        {email: email},
                        {$pull: {coins: {coin: deletedCoin}}}
                    )
                    .then(() => {
                        res
                            .status(200)
                            .json({ message: `Successfully deleted ${deletedCoin} from watchlist.` });
                    })
                    .catch(() => {
                        res
                            .status(401)
                            .json({ message: `Error deleting ${deletedCoin} from watchlist.` });
                    });
            };
        })
    .catch(() => {
        res
            .status(401)
            .json({ message: "Coin doesn't exist in watchlist." });
    });
};