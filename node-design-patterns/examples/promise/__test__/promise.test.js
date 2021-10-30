const NPromise = require('../NewPromise.js');

describe('Promise', () => {
  it('should create a new Promise with pending state', () => {
    const promise = new NPromise(() => {});

    expect(promise.state).toBe('pending');
    expect(promise.value).toBe(undefined);
  });

  describe('When fulfilled', () => {
    it('should hten a Primise', done => {
      return new NPromise(resolve => resolve({ data: 'fake' })).then(response => {
        expect(response.data).toBe('fake');
        done();
      });
    });

    it('should call then just when the async code is resolved', done => {
      return new NPromise(resolve => {
        setTimeout(() => resolve({ data: 'fake2' }), 10);
      }).then(response => {
        expect(response.data).toBe('fake2');
        done();
      });
    });

    it('should allow the same promise to be thenable multiple times', done => {
      const data = 'promise3';
      const promise_1 = new NPromise(resolve => setTimeout(() => resolve({ data }), 10));

      promise_1.then(response => expect(response.data).toBe(data));
      promise_1.then(response => {
        expect(response.data).toBe(data);
        done();
      });
    });

    it('should support chain of promises on which promises are returned', done => {
      const fakeFSPromise = new Promise(resolve => setTimeout(() => resolve({ file: 'photo.jpg' }), 10));
      return new NPromise(resolve => {
        setTimeout(() => resolve({ data: 'promise1' }), 10);
      })
        .then(response => {
          expect(response.data).toBe('promise1');
          return fakeFSPromise;
        })
        .then(response => {
          expect(response.file).toBe('photo.jpg');
          done();
        });
    });
  });

  describe('Error handling', () => {
    it('should call catch when an error is thrown', done => {
      const errorMessage = 'Primise has been rejectd';

      return new NPromise((resolve, reject) => {
        setTimeout(() => reject(new Error(errorMessage)), 10);
      }).catch(error => {
        expect(error.message).toBe(errorMessage);
        done();
      });
    });

    it('should allow catch to be thenable', done => {
      const errorMessage = 'Promise hs been reject';

      return new NPromise((resolve, reject) => {
        setTimeout(() => reject(new Error(errorMessage), 10));
      })
        .catch(error => {
          expect(error.message).toBe(errorMessage);
          return { data: 'someData' };
        })
        .then(response => {
          expect(response.data).toBe('someData');
          done();
        });
    });

    it('should allow to catch an error throw by a provious catch method', done => {
      const errorMessage = 'Promise has been reject';

      return new NPromise((resolve, reject) => {
        setTimeout(() => reject(new Error(errorMessage), 10));
      })
        .catch(error => {
          expect(error.message).toBe(errorMessage);
          throw new Error('That is another error');
        })
        .catch(error => {
          expect(error.message).toBe('That is another error');
          done();
        });
    });
  });
});
