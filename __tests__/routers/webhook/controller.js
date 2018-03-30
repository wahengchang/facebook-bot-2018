const httpMocks = require('node-mocks-http')
const mockTextMsg = require('../../mock/text-msg.js')
const controller = require('../../../routers/webhook/controller')

jest.mock('../../../model/costs', () => {
  return {
    create: function(){return}
  }
})

describe('controller', () => {
  beforeEach(() => {
    res = httpMocks.createResponse()
    req = httpMocks.createRequest({ method: 'GET', url: '/' })
  })

  afterEach(() => {
  })

  it('validate()', done => {
      req.body = mockTextMsg
      res.send = () => done()
      const c = (new controller(req, res)).validate()
  })
})
