const logger = require('../services/logger.service')

module.exports = { log }

async function log(req, res, next) {
    const { baseUrl, params, query } = req

    logger.info('Req was made', baseUrl, params, query)
    next()
}