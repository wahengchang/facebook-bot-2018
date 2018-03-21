const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('-=-=-=-= cost -=-=-=-=')
    // const content = `<pre> ${JSON.stringify(req.normal, null, 2)}</pre>`
    // return res.send(content)

    res.render('/costs')
})

module.exports = router
