import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'app/middleware';
import { RootState, rootReducer } from 'app/reducers';
import {rootSaga} from 'app/sagas'
import createSagaMiddleware from 'redux-saga';
export function configureStore(initialState?: RootState): Store<RootState> {
  const sagaMiddleWare = createSagaMiddleware()
  let middleware = applyMiddleware(logger,sagaMiddleWare);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);

  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<
    RootState
  >;
  sagaMiddleWare.run(rootSaga)

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
