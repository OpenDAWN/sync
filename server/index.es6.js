/**
 * @fileoverview Server-side syncronization component
 * @author Jean-Philippe.Lambert@ircam.fr, Sebastien.Robaszkiewicz@ircam.fr,
 *         Norbert.Schnell@ircam.fr
 */
'use strict';

class SyncServer {
  constructor(getTimeFunction) {
    this.getTimeFunction = getTimeFunction;
  }

  start(sendFunction, receiveFunction) {
    receiveFunction('sync:ping', (id, clientPingTime) => {
      const serverPingTime = this.getLocalTime();
      sendFunction('sync:pong', id, clientPingTime, serverPingTime, this.getLocalTime());
    });
  }

  /**
   * Monotonic function, ever increasing
   *
   * @return {Number} local time in seconds
   */
  getLocalTime(syncTime) {
    if (typeof syncTime !== 'undefined') {
      return syncTime; // sync time is local: no conversion
    } else {
      return this.getTimeFunction();
    }
  }

  getSyncTime(localTime) {
    return this.getLocalTime(localTime); // sync time is local, here
  }

}

module.exports = SyncServer;
