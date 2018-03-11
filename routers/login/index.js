const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('-=-=-=-= GET webhook -=-=-=-=')
    const content = `<pre> ${JSON.stringify(req.normal, null, 2)}</pre>`
    return res.send(content)
})

module.exports = router
