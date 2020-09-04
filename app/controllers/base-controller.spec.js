const expect = require('chai').expect;
const mockery = require('mockery');
const sinon = require('sinon');

describe("base-controller", () => {

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

  it('returns a BaseController object', () => {
    // setup
    mockery.registerMock('../services/base-service', function () { });

    const BaseController = require('./base-controller');
    expect(new (require('./base-controller')) instanceof BaseController).to.be.true;
  });

  it('must have 1 method', () => {
    // setup
    mockery.registerMock('../services/base-service', function () { });

    // new instance
    const BaseController = require('./base-controller');
    const controller = new BaseController();

    // expectations
    expect(Object.keys(controller).length).to.be.equal(1);
  });

  describe('getData()', () => {
    it('must exist', () => {
      // setup
      mockery.registerMock('../services/base-service', function () { });
      const methodName = "getData";

      // new instance
      const BaseController = require('./base-controller');
      const controller = new BaseController();

      // expectations
      expect(Object.keys(controller).includes(methodName)).to.be.true;
    });

    it('should return an ok response', async () => {
      // setup
      const request = 'dummy-request';
      const response = 'dummy-ok-response';
      const callStub = sinon.stub().resolves(response);
      const serviceStub = function () {
        this.call = callStub;
      };
      mockery.registerMock('../services/base-service', serviceStub);

      try {
        // new instance
        const BaseController = require('./base-controller');
        const controller = new BaseController();

        expect(await controller.getData(request)).to.be.equal(response);
        expect(callStub.calledOnce).to.be.true;
        expect(callStub.calledWith(request)).to.be.true;
      } catch (exception) {
        throw `Should be above: ${exception.toString()}`;
      }
    });

    it('should handle an error', async () => {
      // setup
      const request = 'dummy-request';
      const error = 'dummy-error';
      const callStub = sinon.stub().rejects(error);
      const serviceStub = function () {
        this.call = callStub;
      };
      mockery.registerMock('../services/base-service', serviceStub);

      try {
        // new instance
        const BaseController = require('./base-controller');
        const controller = new BaseController();

        // execution & expectations
        const result = await controller.getData(request);
        throw `Should be in the block bellow: ${result}`;
      } catch (exception) {
        expect(callStub.calledOnce).to.be.true;
        expect(callStub.calledWith(request)).to.be.true;
        expect(callStub.threw()).to.be.false;
        expect(exception).to.be.equal(error);
      }
    });

    it('should handle an exception', async () => {
      // setup
      const request = 'dummy-request';
      const exception = 'dummy-exception';
      const callStub = sinon.stub().throws(exception);
      const serviceStub = function () {
        this.call = callStub;
      };
      mockery.registerMock('../services/base-service', serviceStub);

      try {
        // new instance
        const BaseController = require('./base-controller');
        const controller = new BaseController();

        // execution & expectations
        const result = await controller.getData(request);
        throw `Should be in the block bellow: ${result}`;
      } catch (exception) {
        expect(callStub.calledOnce).to.be.true;
        expect(callStub.calledWith(request)).to.be.true;
        expect(callStub.threw()).to.be.true;
        expect(exception).to.be.equal(exception);
      }
    });
  });
});