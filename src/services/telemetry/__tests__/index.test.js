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
  const warning = jest.fn();

  const core = {
    debug,
    warning,
  };

  beforeEach(() => {
    debug.mockClear();
    warning.mockClear();
    sendError.mockClear();
    sendStart.mockClear();
    sendSuccess.mockClear();
  });

  describe('Disabling telemetry', () => {
    describe('sending the option and being a sponsor', () => {
      const getTelemetry = () => new Telemetry({ core, telemetry: false, isSponsor: true });

      it('disables telemetry', () => {
        const telemetry = getTelemetry();
        expect(telemetry.useTelemetry).toEqual(false);
      });

      it('logs telemetry has been disabled', () => {
        getTelemetry();
        expect(debug).toHaveBeenCalled();
      });

      it('does not send a warning', () => {
        getTelemetry();
        expect(warning).not.toHaveBeenCalled();
      });

      it('does not create a tracker', () => {
        const telemetry = getTelemetry();
        expect(telemetry.tracker).toEqual(null);
      });

      it('does not send "error" event, even when called', () => {
        const telemetry = getTelemetry();
        telemetry.error();
        expect(sendError).not.toHaveBeenCalled();
        expect(sendStart).not.toHaveBeenCalled();
        expect(sendSuccess).not.toHaveBeenCalled();
      });

      it('does not send "start" event, even when called', () => {
        const telemetry = getTelemetry();
        telemetry.start();
        expect(sendError).not.toHaveBeenCalled();
        expect(sendStart).not.toHaveBeenCalled();
        expect(sendSuccess).not.toHaveBeenCalled();
      });

      it('does not send "success" event, even when called', () => {
        const telemetry = getTelemetry();
        telemetry.success();
        expect(sendError).not.toHaveBeenCalled();
        expect(sendStart).not.toHaveBeenCalled();
        expect(sendSuccess).not.toHaveBeenCalled();
      });
    });

    describe('sending the option but not being a sponsor', () => {
      const getTelemetry = () => new Telemetry({ core, telemetry: false, isSponsor: false });

      it('keeps telemetry enabled', () => {
        const telemetry = getTelemetry();
        expect(telemetry.useTelemetry).toEqual(true);
      });

      it('warns this is a premium feature', () => {
        getTelemetry();
        expect(warning).toHaveBeenCalled();
      });
    });
  });

  describe('.error', () => {
    const getTelemetry = () => new Telemetry({ core, telemetry: true });

    it('calls .sendError with the correct parameters', () => {
      const telemetry = getTelemetry();
      const error = 'Sample error message';
      telemetry.error(error);
      expect(sendError).toHaveBeenCalledWith({
        error,
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
