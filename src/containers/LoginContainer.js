import React from 'react';
import { useDispatch } from 'react-redux';
import { typeLogin } from '../modules/userAuthorization';
import KakaoLogin from '../components/Entrance/KakaoLogin';

// * =====================
// *   LOGIN_CONTAINER(CT)
// * =====================

function LoginContainer() {
  //* useDispatch
  const dispatch = useDispatch();

  //* dispatch 'LOGIN_USER' type
  const socialLogin = (userData) => {
    dispatch(typeLogin(userData));
  };

  //* RENDER
  return (
    <>
      <KakaoLogin socialLogin={socialLogin} />
    </>
  );
}

export default LoginContainer;