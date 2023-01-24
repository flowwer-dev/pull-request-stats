const Telemetry = require('../index');
const sendError = require('../sendError');
const sendStart = require('../sendStart');
const sendSuccess = require('../sendSuccess');

const TRACKER = 'TRACKER';

jest.mock('../sendError', () => jest.fn());
jest.mock('../sendStart', () => jest.fn());
jest.mock('../sendSuccess', () => jest.fn());
jest.mock('../buildTracker', () => jest.fn(() => TRACKER));

describe('Telemetry', () => {
  const debug = jest.fn();
  const error = jest.fn();

  const core = {
    debug,
    error,
  };

  beforeEach(() => {
    debug.mockClear();
    error.mockClear();
    sendError.mockClear();
    sendStart.mockClear();
    sendSuccess.mockClear();
  });

  describe('.error', () => {
    const getTelemetry = () => new Telemetry({ core, telemetry: true });

    it('calls .sendError with the correct parameters', () => {
      const telemetry = getTelemetry();
      const message = 'Sample error message';
      telemetry.error(message);
      expect(sendError).toHaveBeenCalledWith({
        error: message,
        tracker: TRACKER,
      });
    });
  });

  describe('.start', () => {
    const getTelemetry = () => new Telemetry({ core, telemetry: true });

    it('calls .sendStart with the correct parameters', () => {
      const telemetry = getTelemetry();
      const params = { foo: 'bar' };
      telemetry.start(params);
      expect(sendStart).toHaveBeenCalledWith({
        ...params,
        tracker: TRACKER,
      });
    });

    it('tracks the starting date', () => {
      const telemetry = getTelemetry();
      const params = { foo: 'bar' };
      expect(telemetry.startDate).toBeFalsy();
      telemetry.start(params);
      expect(telemetry.startDate).toBeTruthy();
      expect(telemetry.startDate.getTime()).toBeTruthy();
    });
  });

  describe('.success', () => {
    const getTelemetry = () => new Telemetry({ core, telemetry: true });

    it('calls .sendSuccess with the correct parameters', () => {
      const telemetry = getTelemetry();
      telemetry.success();
      expect(sendSuccess).toHaveBeenCalledWith(expect.objectContaining({
        timeMs: expect.any(Number),
        tracker: TRACKER,
      }));
    });
  });
});
