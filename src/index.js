import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// * ===========================
// * REDUX & SAGA_MIDDLE_WARE
// * ===========================
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { typeAuthUser } from './modules/userAuthorization';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

(() => {
  store.dispatch(typeAuthUser());
})();

// const store = createStore(rootReducer); // 스토어를 만듭니다.
// console.log(store.getState()); // 스토어의 상태를 확인해봅시다.

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
