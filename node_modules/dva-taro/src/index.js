import { create } from 'dva-core-taro';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';


function createStore(opt = {}, otherOpt = { isCreateLogger: true }) {
  if (otherOpt.isCreateLogger && process.env.NODE_ENV === 'development') {
    opt.onAction = [createLogger()];
  }
  const app = create(opt);
  app.use(createLoading({}));

  opt.models && opt.models.forEach(model => app.model(model));
  app.start();

  const store = app._store;
  store.dispatch = store.dispatch.bind(store);
  return store;
}

export default createStore;
