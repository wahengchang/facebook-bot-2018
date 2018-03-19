
(async function() {
    require('../model/init')
    const cost = require('../model/costs')

    const randomString = ()=> Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const genMockCost = () => ({
        cost: 123,
         category: randomString(),
         userId: randomString()
    })
    const result = await Promise.all([
        cost.create(genMockCost()),
        cost.create(genMockCost()),
        cost.create(genMockCost()),
        cost.create(genMockCost()),
        cost.create(genMockCost()),
    ])

    console.log(result.length, ' cost objects are creates ');
}());
