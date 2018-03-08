const hardMatch = (matchTable, str = '', disableLowerCase) => {
    const _str = disableLowerCase? str: str.toLowerCase()

    for(let i=0; i<matchTable.length; i++){
        if(_str.includes(matchTable[i])) return true
    }

    return false
}

const matchSpend = (str = '') => {
    const matchTable = ['spend', 'spent']
    return hardMatch(matchTable, str)
}

const extractNumber = (str = '') => {
    const _num = str.match(/\d+/) && str.match(/\d+/)[0]
    return parseInt(_num || -1)
}

const extractCategory = (str) => {
    var myRegexp = /on (.*)/
    var match = myRegexp.exec(str)
    return (match && match[1]) || ''
}

module.exports = {
    matchSpend,
    extractNumber,
    extractCategory
}