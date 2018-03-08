const cost = require('../../model/cost')

const randomString = ()=> Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

describe('cost object', ()=>{
    beforeAll(()=>{
        require('../../model/init')
    })

    afterAll(()=>{
        // console.log('AV.User._currentUser: ', AV.User._currentUser)
    })

    it('cost()', (done)=>{
        const mock = {
            cost: 123,
             category: randomString(),
             userId: randomString()
        }
        cost.create(mock).then((_o)=>{
            expect(_o.get('cost')).toBe(mock.cost)
            expect(_o.get('category')).toBe(mock.category)
            expect(_o.get('userId')).toBe(mock.userId)
            done()
        })
    })
})