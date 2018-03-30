const { turnDateToStr, getBeforeDate } = require('../../lib/date')

describe('turnDateToStr', () => {
  it('should return a string', () => {
    const today = new Date('2018 1 2')
    expect(turnDateToStr(today)).toEqual('2018-1-2')
  })

  it('should return a ""', () => {
    expect(turnDateToStr()).toEqual('')
  })
})


describe('getBeforeDate', () => {
  it('should return a date() before today', () => {
    const today = (new Date()).getDate()
    const nAgo = 3

    const _agoDay = getBeforeDate(nAgo).getDate()

    expect(_agoDay).toEqual(today - nAgo)
  })
})

