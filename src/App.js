import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { createStore } from "redux";

import Main from './pages/Main';
import Entrance from './pages/Entrance';
import KakaoLogin from './pages/KakaoLogin';
import MemberSetting from './pages/MemberSetting';
import DirectorSetting from './pages/DirectorSetting';
import Room from './pages/Room';
import Webrtc from './components/Webrtc';
import TESTBUTTON from './pages/TESTBUTTON';

import './App.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Entrance} />
          <Route exact path="/Main" component={Main} />
          <Route exact path="/KakaoLogin" component={KakaoLogin} />
          <Route exact path="/JoinSetting" component={MemberSetting} />
          <Route exact path="/AdminSetting" component={DirectorSetting} />
          <Route exact path="/room" component={Room} />
          <Route exact path="/webrtc" component={Webrtc} />
          <Route exact path="/TESTBUTTON" component={TESTBUTTON} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
