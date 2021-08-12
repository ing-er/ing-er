import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typeLogin } from '../modules/userAuthorization';
import KakaoLogin from '../components/Entrance/KakaoLogin';
import CommonLogin from '../components/Entrance/CommonLogin';

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
  
  const [uniqueNumber, setUniqueNumber] = useState('');
  //* dispatch 'LOGIN_USER' type

  useEffect(() => {
    if (isJoin && isAuth) {
      history.push({ pathname: '/joinsetting' });
    } else if (!isJoin && isAuth) {
      history.push({ pathname: '/main' });
    };
  }, [isJoin, isAuth]);

  const onPressUniqueNumber = () => {
    if (uniqueNumber == '') {
      alert('코드를 입력해 주세요')
    } else {
      const formData = {
        oAuthId: Number(uniqueNumber)
      };
        dispatch(typeLogin(formData));
    }
	};

  const socialLogin = (userData) => {
    dispatch(typeLogin(userData));
  };

  const setKakaoDialogOp = () => {
    dispatch(setKakoDialogOpen());
  };

  const setKakoDialogCl = () => {
    dispatch(setKakoDialogClose());
  };

  // const { isOpen } = useSelector((state) => state.authorization);

  //* RENDER
  return (
    <>
    <CommonLogin
    uniqueNumber={uniqueNumber}
    setUniqueNumber={setUniqueNumber}
    onPressUniqueNumber={onPressUniqueNumber}
    />
      <KakaoLogin
        socialLogin={socialLogin}
        setKakaoDialogOpen={setKakaoDialogOp}
        setKakaoDialogClose={setKakoDialogCl}
        // isOpen={isOpen}
      />
    </>
  );
}

export default LoginContainer;
