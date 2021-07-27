import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { createStore } from "redux";

import Main from "./pages/Main";
import KakaoLogin from "./pages/KakaoLogin";
import Entrance from "./pages/Entrance";

import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/Main" component={Main} />
          <Route exact path="/KakaoLogin" component={KakaoLogin} />
          <Route exact path="/JoinSetting" component={Entrance} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;