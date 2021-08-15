import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typeLogin } from '../modules/userAuthorization';
import KakaoLogin from '../components/Entrance/KakaoLogin';
import CommonLogin from '../components/Entrance/CommonLogin';
import {
  setKakoDialogOpen,
  setKakoDialogClose,
  typeAuthUser,
} from '../modules/userAuthorization';
import { useHistory } from 'react-router';

// * =====================
// *   LOGIN_CONTAINER(CT)
// * =====================

function LoginContainer() {
  //* useDispatch
  const dispatch = useDispatch();
  const history = useHistory();

  let { isJoin, isAuth, isAdmin } = useSelector(({ authorization }) => ({
    isJoin: authorization.isJoin,
    isAuth: authorization.isAuth,
    isAdmin: authorization.isAdmin,
  }));
  
  const [uniqueNumber, setUniqueNumber] = useState('');
  //* dispatch 'LOGIN_USER' type

  useEffect(() => {
    dispatch(typeAuthUser());
  }, []);

  useEffect(() => {
    if (isAdmin){
      history.push({ pathname: '/adminsetting' });
    } else {
      if (isJoin && isAuth) {
        history.push({ pathname: '/joinsetting' });
      } else if (!isJoin && isAuth) {
        history.push({ pathname: '/main' });
      };
    }
  }, [isAdmin, isJoin, isAuth]);

  const onPressUniqueNumber = () => {
    if (uniqueNumber == '') {
      alert('코드를 입력해 주세요.')
      // Swal.fire({
      //   title: '<span style="color: white">코드를 입력해 주세요. <span>',
      //   icon: 'error',
      //   background: '#292A33',
      //   confirmButtonColor: '#E96F02',
      //   confirmButtonText: 'OK!',
      //   zIndex: 'X',
      // }).then((result) => {
      // });
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
      />
    </>
  );
}

export default LoginContainer;
