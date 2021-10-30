class DataPipeline {
  constructor(middlewares, data) {
    this.middlewares = middlewares;
    this.finished = false;

    data.end = () => {
      console.log('Pipeline has ended');
      this.finished = true;
    };

    this.data = data;
  }

  /**
   * @data stays in a closure here
   */
  dispatch() {
    let iterator = 0;
    if (iterator < this.middlewares.length) {
      const firstMiddleware = this.middlewares[iterator];

      const next = () => {
        iterator++;
        if (!this.finished && iterator < this.middlewares.length) {
          const nextMiddleware = this.middlewares[iterator];
          nextMiddleware(this.data, next);
        } else {
          this.data.end();
        }
      };

      firstMiddleware(this.data, next);
    }
  }
}

module.exports = DataPipeline;
