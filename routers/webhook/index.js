const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.post('/', async (req, res) => {
    console.log('-=-=-=-= POST webhook -=-=-=-=')
    let body = req.body
  
    if (body.object !== 'page') return res.sendStatus(404)
  
    return await (new controller(req, res)).validate()
})

router.get('/', (req, res) => {
    console.log('-=-=-=-= GET webhook -=-=-=-=')
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN
  
    // Parse the query params
    let mode = req.query['hub.mode']
    let token = req.query['hub.verify_token']
    let challenge = req.query['hub.challenge']
  
    if (!mode || !token) return res.sendStatus(500)
  
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED')
      return res.status(200).send(challenge)
    }
    
      // Responds with '403 Forbidden' if verify tokens do not match
      return res.sendStatus(403)
})

module.exports = router
