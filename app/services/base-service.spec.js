const expect = require('chai').expect;
const mockery = require('mockery');
const sinon = require('sinon');
const BaseService = require('./base-service');

describe("BaseService", () => {

  beforeEach(() => {
    mockery.enable({
      useCleanCache: true,
      warnOnReplace: true,
      warnOnUnregistered: false
    });

    sinon.restore();
    sinon.reset();
  });

  afterEach(() => {
    mockery.deregisterAll();
    mockery.disable();
  })

  it('returns a BaseService object', () => {
    // setup
    mockery.registerMock('request', { });

    const BaseService = require('./base-service');
    expect(new (require('./base-service')) instanceof BaseService).to.be.true;
  });

  it('must have 1 method', () => {
    // setup
    mockery.registerMock('request', { });

    // new instance
    const BaseService = require('./base-service');
    const service = new BaseService();

    // expectations
    expect(Object.keys(service).length).to.be.equal(1);
  });

  describe('call()', () => {
    it('must exist', () => {
      // setup
      mockery.registerMock('request', { });
      const methodName = "call";

      // new instance
      const BaseService = require('./base-service');
      const service = new BaseService();

      // expectations
      expect(Object.keys(service).includes(methodName)).to.be.true;
    });

    it('should return an ok response', (done) => {
      // setup
      const response = {
        body: 'dummy-ok-response'
      };
      const requestObj = {
        getRequest: sinon.spy()
      };
      const requestStub = {
        get: (req, callback)
      };
      mockery.registerMock('request', requestStub);

      // new instance & execution
      const service = new BaseService();

      // execution & expectations
      service.call(requestObj)
        .then((resolution) => {
          expect(resolution).to.be.equal(response.body);
          done();
        })
        .catch((rejection) => {
          done(new Error(`Should be in the block above: ${rejection.toString()}`));
        });

    });
  });
});