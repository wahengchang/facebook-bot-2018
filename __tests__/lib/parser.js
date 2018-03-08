const { matchSpend, extractNumber, extractCategory } = require('../../lib/parser')

describe('matchSpend', () => {
  it('should return true when given "spend"', () => {
    expect(matchSpend('spend')).toBe(true)
  })
  it('should return true when given "Spend"', () => {
    expect(matchSpend('Spend')).toBe(true)
  })
  it('should return true when given "spent"', () => {
    expect(matchSpend('spent')).toBe(true)
  })
  it('should return true when given "Spent"', () => {
    expect(matchSpend('Spent')).toBe(true)
  })
  it('should return false when given "Spe1234"', () => {
    expect(matchSpend('Spe1234')).toBe(false)
  })
  it('should return false when given null', () => {
    expect(matchSpend()).toBe(false)
  })
})

describe('extractNumber', () => {
  it('should return 123 when given "qwert123asdf"', () => {
    expect(extractNumber('qwert123asdf')).toBe(123)
  })
  it('should return 123 when given "qwert123asdf456"', () => {
    expect(extractNumber('qwert123asdf456')).toBe(123)
  })
  it('should return -1 when given no number', () => {
    expect(extractNumber('asdwe')).toBe(-1)
  })
  it('should return -1 when given null', () => {
    expect(extractNumber()).toBe(-1)
  })
})

describe('extractCategory', () => {
  it('should return car when given "car"', () => {
    expect(extractCategory('spend 1234 on car')).toBe('car')
  })
  it('should return car abc when given "car abc"', () => {
    expect(extractCategory('spend 1234 on car abc')).toBe('car abc')
  })
  it('should return zxc on car abc when given double on', () => {
    expect(extractCategory('spend 1234 on zxc on car abc')).toBe('zxc on car abc')
  })
  it('should return zxc on car abc when given double on', () => {
    expect(extractCategory('spend 1234')).toBe('')
  })
})
