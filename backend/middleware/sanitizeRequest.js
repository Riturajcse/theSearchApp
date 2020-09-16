const Sanitize = require('mongo-sanitize');

function sanitizeRequest (req, res, next) {
    //sanitize query
    Object.keys(req.query).forEach(param => {
        req.query[param] = Sanitize(req.query[param])
    })
    //sanitize params
    Object.keys(req.params).forEach(param => {
        req.params[param] = Sanitize(req.params[param])
    })
    //sanitize body
    Object.keys(req.body).forEach(param => {
        req.body[param] = Sanitize(req.body[param])
    })
    next()
}

module.exports = sanitizeRequest;

