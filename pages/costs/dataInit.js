const cost = require('../../model/costs')
const {parser} = require('../../model/utils')

module.exports = ({req, res}) => {
    console.log(parser.listPayload(req.normal))

    return cost.list(parser.listPayload(req.normal))
        .then( costList => {

            costList.forEach(element => {
                console.log(element['createdAt'] - new Date('2018 03 22'))
            });

            return ({costList})
        })
}

