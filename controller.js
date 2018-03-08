const {matchSpend,extractNumber,extractCategory}  = require('./lib/parser')
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

controller.prototype.validate = function () {
    console.log(JSON.stringify(this.req.body, null, 2))

    return this.req.body.entry.forEach(function (entry) {
        const costObj = btpParser(entry)
        if(costObj){
            return cost.create(costObj)
                .then(()=> {
                    console.log('$', costObj.cost, ' costObj: is created')
                    return this.res.status(200).send('EVENT_RECEIVED')
                }, (err)=>{
                    console.log('err: ', err)
                    return this.res.status(500).send('CREATE_DB_ERROR')
                })
            }
    })
    
}

module.exports = controller
