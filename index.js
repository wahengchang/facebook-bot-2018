'use strict'

const express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()), // creates express http server
  controller = require('./controller'),
  port = process.env.PORT || 1337

require('./model/init')
app.use(express.static('public'))

app.post('/webhook', async (req, res) => {
  console.log('-=-=-=-= POST webhook -=-=-=-=')
  let body = req.body

  if (body.object !== 'page') return res.sendStatus(404)

  return await (new controller(req, res)).validate()
})

app.get('/webhook', (req, res) => {
  console.log('-=-=-=-= GET webhook -=-=-=-=')
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN

  // Parse the query params
  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']

  if (!mode || !token) return res.sendStatus(500)

  // Checks the mode and token sent is correct
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    // Responds with the challenge token from the request
    console.log('WEBHOOK_VERIFIED')
    return res.status(200).send(challenge)
  }
  
    // Responds with '403 Forbidden' if verify tokens do not match
    return res.sendStatus(403)
})

// Sets server port and logs message on success
app.listen(port, () => console.log(`webhook is listening on port: ${port}`))
