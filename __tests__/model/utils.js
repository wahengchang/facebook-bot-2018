const {parser} = require('../../model/utils')
const randomString = ()=> Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


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
})