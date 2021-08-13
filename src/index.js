import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import persistedReducer from './modules';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// * ===========================
// * REDUX & SAGA_MIDDLE_WARE
// * ===========================
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { typeAuthUser } from './modules/userAuthorization';

const sagaMiddleware = createSagaMiddleware();
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleware))
// );
// sagaMiddleware.run(rootSaga);

// composeWithDevTools와 미들웨어 saga, reduxthunk, promise
const store = createStore(persistedReducer, 
  composeWithDevTools(applyMiddleware(sagaMiddleware, ReduxThunk, promiseMiddleware)), 
  );
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);	// 추가

(() => {
  store.dispatch(typeAuthUser());
})();

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
