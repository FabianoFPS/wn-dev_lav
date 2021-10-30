class Logger {
  constructor() {
    this.config = {
      appName: 'Not configured',
    };
  }

  setConfig(config) {
    this.config = config;
  }

  log(message, ...params) {
    console.log(this.config, message, params);
  }
}

let configuration = {
  appName: 'Not configured',
};

const LoggerObj = {
  setConfig(config) {
    configuration = config;
  },

  log(message, ...params) {
    console.log(configuration, message, params);
  },
};
module.exports = LoggerObj;
module.exports = new Logger();
