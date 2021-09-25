const kLogList = Symbol('kLogList');

class LogControl {
    constructor() {
      this[kLogList] = [];
    }

    get logs() {
      return this[kLogList];
    }

    add(log) {
      return this;
    }

    clear() {
      this[kLogList] = [];
      return this;
    }
}

module.exports = LogControl