const sendError = require('./sendError');
const sendStart = require('./sendStart');
const sendSuccess = require('./sendSuccess');
const buildTracker = require('./buildTracker');

class Telemetry {
  constructor({ core, telemetry }) {
    this.useTelemetry = telemetry;
    this.tracker = this.useTelemetry ? buildTracker() : null;
    if (!this.useTelemetry) core.debug('Telemetry disabled correctly');
  }

  start(params) {
    if (!this.useTelemetry) return;
    this.startDate = new Date();
    sendStart({
      ...params,
      tracker: this.tracker,
    });
  }

  error(error) {
    if (!this.useTelemetry) return;
    sendError({
      error,
      tracker: this.tracker,
    });
  }

  success() {
    if (!this.useTelemetry) return;
    sendSuccess({
      timeMs: new Date() - this.startDate,
      tracker: this.tracker,
    });
  }
}

module.exports = Telemetry;
