import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createStore } from "redux";

import Main from "./pages/Main";

import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
