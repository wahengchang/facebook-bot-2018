const express = require('express')
const next = require('next')
const bodyParser = require("body-parser");
const port = process.env.PORT || parseInt(process.env.opePORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

require('./model/init')

app.prepare()
.then(async () => {
  const server = express()

  // middleware init below
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }))
//   server.use(require('./lib/middleware/renderEngine')(app))
  server.use(require('./lib/middleware/normalizer')(app))
//   server.use(helmet())
  server.disable('x-powered-by')

  // routers config below
  server.use('/login', require('./routers/login'))
  server.use('/webhook', require('./routers/webhook'))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})