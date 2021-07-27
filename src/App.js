import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import Main from "./pages/Main";

import "./App.css";
import rootReducer from "./modules";

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

