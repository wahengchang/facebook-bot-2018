const create = (payload) => {
    if(!payload.cost) return Promise.reject(new Error('[Missing field] cost is required'))
    if(!payload.userId) return Promise.reject(new Error('[Missing field] userId is required'))

    var Cost = new (AV.Object.extend('Cost'))()
    return Cost.save(payload)
}

module.exports = {create}