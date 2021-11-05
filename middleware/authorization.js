//const Users = require('../models/Users');

const signedIn = (req, res, next) => {
    const username = req.session.username;
    if (username === undefined || username === ''){
        res.status(401).json({
            error: 'Your are not signed-in.'
        }).end();
        return;
    }
    next();
};


module.exports = Object.freeze({
    signedIn,

  });