const cost = require('../../model/costs')
const randomString = ()=> Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

let createdObjId

const expectArrayDescendingByField = (list, field) => {
    for(let i =1; i<list.length; i++){
        expect(list[i].get(field) - list[i-1].get(field)).toBeLessThanOrEqual(0)
    }
}

describe('cost object', ()=>{
    beforeAll(()=>{
        require('../../model/init')
    })

    afterAll(()=>{
        // console.log('AV.User._currentUser: ', AV.User._currentUser)
    })

    it('create()', (done)=>{
        const mock = {
            cost: 123,
             category: randomString(),
             userId: randomString()
        }
        cost.create(mock).then((_o)=>{
            createdObjId = _o.id
            expect(_o.get('cost')).toBe(mock.cost)
            expect(_o.get('category')).toBe(mock.category)
            expect(_o.get('userId')).toBe(mock.userId)
            done()
        })
    })


    describe('list()', ()=>{
        let secondId
        it('basic', (done)=>{
            cost.list().then((list)=>{
                secondId = list[1].id
                expect(list.length).toBe(10)
                expectArrayDescendingByField(list, 'createdAt')
                done()
            })
        })

        it('skip = 1', (done)=>{
            cost.list({skip:1}).then((list)=>{
                expect(list[0].id).toBe(secondId)
                done()
            })
        })
        it('limit = 2', (done)=>{
            cost.list({limit:2}).then((list)=>{
                expect(list.length).toBe(2)
                done()
            })
        })
    })

    it('remove()', (done)=>{
        cost.remove(createdObjId).then((_o)=>{
            expect(_o.id).toBe(createdObjId)
            done()
        })
    })
})