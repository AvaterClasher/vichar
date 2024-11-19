const log = require('../logger').log;

const debugReq = (req, res, next) => {
    log.info("Request: ", req.method, req.originalUrl);
    next();
};

module.exports = { debugReq };