import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typeLogin } from '../modules/userAuthorization';
import KakaoLogin from '../components/Entrance/KakaoLogin';

import {
  setKakoDialogOpen,
  setKakoDialogClose,
} from '../modules/userAuthorization';

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
