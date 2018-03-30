'use strict'
const { parse } = require('url')

module.exports = (app) => (req, res, next) => {
  res.render = (routerPath) => {
    const { pathname, query } = parse(req.url, true)
    app.render(req, res, routerPath, query)
  }
  next()
}