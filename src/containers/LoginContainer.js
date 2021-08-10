import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typeLogin } from '../modules/userAuthorization';
import KakaoLogin from '../components/Entrance/KakaoLogin';

import {
  setKakoDialogOpen,
  setKakoDialogClose,
} from '../modules/userAuthorization';
import { useHistory } from 'react-router';

// * =====================
// *   LOGIN_CONTAINER(CT)
// * =====================

function LoginContainer() {
  //* useDispatch
  const dispatch = useDispatch();
  const history = useHistory();  

  let { isJoin, isAuth } = useSelector(({authorization }) => ({
    isJoin: authorization.isJoin,
    isAuth: authorization.isAuth,
  }));

  //* dispatch 'LOGIN_USER' type
  const socialLogin = (userData) => {
    dispatch(typeLogin(userData));
  };

  useEffect(() => {
    if (isJoin && isAuth) {
      history.push({ pathname: '/joinsetting' })
    } else if (!isJoin && isAuth) {
      history.push({ pathname: '/main' })
    }
  }, [isJoin, isAuth]);

  const setKakaoDialogOp = () => {
    dispatch(setKakoDialogOpen());
  };

  const setKakoDialogCl = () => {
    dispatch(setKakoDialogClose());
  };

  const { isOpen } = useSelector((state) => state.authorization);

  //* RENDER
  return (
    <>
      <KakaoLogin
        socialLogin={socialLogin}
        setKakaoDialogOpen={setKakaoDialogOp}
        setKakaoDialogClose={setKakoDialogCl}
        isOpen={isOpen}
      />
    </>
  );
}

export default LoginContainer;
