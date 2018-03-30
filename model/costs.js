const CLASS_NAME = 'Cost'

const create = (payload) => {
    if(!payload.cost) return Promise.reject(new Error('[Missing field] cost is required'))
    if(!payload.userId) return Promise.reject(new Error('[Missing field] userId is required'))

    const Cost = new (AV.Object.extend(CLASS_NAME))()
    return Cost.save(payload)
}

const list = (payload = {}, field={}, exist={}) => {
    const {
        limit = 10,
        skip =0,
        ascending,
        descending = 'createdAt',
        greaterThan,
        lessThan
    } = payload

    var query = new AV.Query(CLASS_NAME)

    if(limit) query.limit(limit)

    if(skip) query.skip(skip)

    if(greaterThan && greaterThan.field)
        query.greaterThan(greaterThan.field, greaterThan.val)

    if(lessThan && lessThan.field)
        query.lessThan(lessThan.field, lessThan.val)

    if(ascending)
        query.ascending(ascending)
    else 
        query.descending(descending)

    query.doesNotExist('disable')
    return query.find()
}

const remove = (id) => {
    if(!id) return Promise.reject(new Error('[Missing field] id is required'))

    const Cost = AV.Object.createWithoutData(CLASS_NAME, id);
    return Cost.destroy()
}

module.exports = {create, remove, list}