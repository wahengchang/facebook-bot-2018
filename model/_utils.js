const removeEmpty =  (obj) => {
    const _obj = {...obj}

    Object.keys(_obj).forEach(
        key => _obj[key] === undefined ? delete _obj[key] : '')

    return _obj
}

const sortbyParser = (sortStr = '') => {
    if(!sortStr) return

    if(!sortStr.includes('-')) return {ascending: sortStr}

    const _split = sortStr.split('-')

    if(_split.length >= 2)
        return {descending: _split[1]}

    return {ascending: _split[0]}
}

const dateParser = ({start, end}) => {
    if(!start) return {}

    if(!end)
        end = new Date()

    const genCreatedAtObj = (_date) => ({
        field: 'createdAt',
        val: _date
    })

    const strToDate = str => {
        //when given is new Date()
        if(typeof str === 'object') 
            return genCreatedAtObj(str) 

        return genCreatedAtObj(
            new Date(str.split('-').join(' '))
        )
    }

    return {
        greaterThan: strToDate(start),
        lessThan: strToDate(end)
    }
}

const listPayload = (reqNor = {}) => {
    const {limit, skip, sortby, start, end} = reqNor
    return removeEmpty({
        limit, skip,
        ...sortbyParser(sortby),
        ...dateParser({start, end})
    })
}

const parser = {
    listPayload,
    date : dateParser
}

module.exports = {
    parser
}