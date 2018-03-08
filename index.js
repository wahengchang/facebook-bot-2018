'use strict'

const express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()), // creates express http server
  port = process.env.PORT || 1337

app.post('/webhook', (req, res) => {
  let body = req.body

  if (body.object !== 'page') return res.sendStatus(404)

  body.entry.forEach(function (entry) {
    let webhook_event = entry.messaging[0]
    console.log(webhook_event)
  })

  res.status(200).send('EVENT_RECEIVED')
})

app.get('/webhook', (req, res) => {
  let VERIFY_TOKEN = process.env.APP_TOKEN

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
