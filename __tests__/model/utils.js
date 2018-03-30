const {parser} = require('../../model/utils')
const randomString = ()=> Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


describe('parser.date', ()=>{
    it('start and end', ()=> {
        const start = '2018-03-10'
        const end = '2018-03-12'

        const result = parser.date({start, end})

        expect(result.greaterThan.val).toEqual(new Date('2018 03 10'))
        expect(result.lessThan.val).toEqual(new Date('2018 03 12'))
    })

    it('only start', ()=>{
        const start = '2018-03-10'

        const result = parser.date({start})

        expect(result.greaterThan.val).toEqual(new Date('2018 03 10'))
        expect(result.lessThan.val.toString()).toEqual((new Date()).toString())
    })

    it('only end', ()=>{
        const end = '2018-03-10'
        const result = parser.date({end})

        expect(result).toEqual({})
    })
})


describe('parser.listPayload', ()=>{
    it('empty', ()=>{
        expect(parser.listPayload()).toEqual({})
    })

    it('undefined', ()=>{
        expect(parser.listPayload(undefined)).toEqual({})
    })

    it('{limit}', ()=>{
        const mock = {limit: 1}
        expect(parser.listPayload(mock)).toEqual(mock)
    })

    it('{skip}', ()=>{
        const mock = {skip: 1}
        expect(parser.listPayload(mock)).toEqual(mock)
    })

    it('{sort}', ()=>{
        const mock = {sortby: 'abc'}
        const expectResult = {ascending: mock.sortby}
        expect(parser.listPayload(mock)).toEqual(expectResult)
    })

    it('{-sort}', ()=>{
        const mock = {sortby: '-abc'}
        const expectResult = {descending: 'abc'}
        expect(parser.listPayload(mock)).toEqual(expectResult)
    })

    it('{start, end}', ()=>{
        const start = '2018-03-10'
        const end = '2018-03-12'
        const mock = {start, end}

        const result = parser.listPayload(mock)

        expect(result.greaterThan.val).toEqual(new Date('2018 03 10'))
        expect(result.lessThan.val).toEqual(new Date('2018 03 12'))
    })

    it('{start}', ()=>{
        const start = '2018-03-10'
        const mock = {start}

        const result = parser.listPayload(mock)

        expect(result.greaterThan.val).toEqual(new Date('2018 03 10'))
        expect(result.lessThan.val.toString()).toEqual((new Date()).toString())
    })
})