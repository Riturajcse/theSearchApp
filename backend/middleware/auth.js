const jwt = require('jsonwebtoken');
const config = require('config');

function auth (req, res, next) {
    const token = (req.body && req.body.token) || req.header('x-auth-token') || (req.headers && req.headers.authorization && req.headers.authorization.split('Bearer ')[1]);
    if (!token) return res.status(401).send('Access denied. No token is provided');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();

    } catch(err) {
        console.log('err:- ', err);
        return res.status(400).send('Invalid token');
    }
}

module.exports = auth;