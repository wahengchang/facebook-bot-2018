module.exports = (app) => (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || ''

    const normal = { ...req.body, ...req.query, ip, userAgent}
    req.normal = {...normal}
    next()
}