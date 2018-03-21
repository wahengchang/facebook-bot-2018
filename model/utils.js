const removeEmpty =  (obj) => {
    const _obj = {...obj}

    Object.keys(_obj).forEach(
        key => _obj[key] === undefined ? delete _obj[key] : '')

    return _obj
}

const sortbyParser = (sortStr = '') => {
    if(!sortStr) return

    if(!sortStr.includes('-')) {ascending: sortStr}

    const _split = sortStr.split('-')

    if(_split.length >= 2)
        return {descending: _split[1]}

    return {ascending: _split[0]}
}

const listPayload = (reqNor = {}) => {
    const {limit, skip, sortby} = reqNor
    return removeEmpty({
        limit, skip,
        ...sortbyParser(sortby)
    })
}

const parser = {
    listPayload
}

module.exports = {
    parser
}