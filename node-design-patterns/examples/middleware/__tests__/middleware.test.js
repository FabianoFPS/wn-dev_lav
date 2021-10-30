const MiddlewareManager = require('../middleware_manager')

describe('MiddlewareManager', () => {
  const middlewareManager = new MiddlewareManager();
  const logMiddleware = (data, next) => {
    console.log('logMiddleware', data.user);
    next();
  };
  const defaultData = {
    user: {
      name: 'Jhon Doe',
    },
  };

  it('should create a new instance of MiddlewareManager', () => {
    expect(middlewareManager).toBeInstanceOf(MiddlewareManager);
  });

  it('should execute all middlewares in order until reaching the end', () => {
    const JHON = 'Jhon';
    const logMiddleware = (data, next) => {
      console.log('logMiddleware', data.user);
      next();
    }
    const nameEnhanceMiddleware = (data, next) => {
      data.user.firstName = data.user.name.split(' ')[0];
      next();
    }
    const expectMiddleware = (data, next) => {
      expect(data.user.firstName).toBe(JHON)
      next();
    }

    const data = {
      user: {
        name: `${JHON} Doe`
      }
    }

    const middlewareManager = new MiddlewareManager()
    middlewareManager.use(logMiddleware)
    middlewareManager.use(nameEnhanceMiddleware)
    middlewareManager.use(expectMiddleware)
    middlewareManager.process(data)
  });

  it('should process finish the pipeline when done is called', () => {
    let middlewareCalled = false;

    const testOrderMiddleware = () => {
      middlewareCalled = true;
    };
    const expectMiddleware = data => {

      data.end();
      expect(data.user.firstName).toBe('Jhon');
      expect(middlewareCalled).toBe(false);
    };

    middlewareManager.use(expectMiddleware);
    middlewareManager.use(testOrderMiddleware);
    middlewareManager.use(logMiddleware);
    middlewareManager.process(defaultData);
  });
})