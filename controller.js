const {matchSpend,extractNumber,extractCategory}  = require('./lib/parser')
const {sendTextMessage}  = require('./lib/bot')
const cost = require('./model/cost')

const controller = function (req, res) {
  this.req = req
  this.res = res
}

// bill tracking processer
// btp
const btpParser = (entry) => {
    const str = entry.messaging && entry.messaging[0] && entry.messaging[0].message && entry.messaging[0].message.text
    const userId = entry.messaging && entry.messaging[0] && entry.messaging[0].sender && entry.messaging[0].sender.id

    let cost, category

    if(!matchSpend(str)) return false

    cost = extractNumber(str)
    if(cost === -1) return false

    category = extractCategory(str)

    return {cost, category, userId}
}

controller.prototype.validate = async function () {
    console.log('1 -=-=-=-=-=-=-=-= validate -=-=-=-=-=-=-=-=')
    console.log(JSON.stringify(this.req.body, null, 2))
    
    for (let entry of this.req.body.entry) {
        const costObj = btpParser(entry)
        if(costObj){
            await cost.create(costObj)
            const msg = '$'+ costObj.cost+ ' costObj: is recorded'
            await sendTextMessage(costObj.userId, msg)
            return this.res.status(200).send('EVENT_RECEIVED')
        }
    }
    
    return this.res.status(200).send('EVENT_DONE')
}

module.exports = controller
