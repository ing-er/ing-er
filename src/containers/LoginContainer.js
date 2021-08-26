import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KakaoLogin from '../components/Entrance/KakaoLogin';
import CommonLogin from '../components/Entrance/CommonLogin';
import {
  setKakoDialogOpen,
  setKakoDialogClose,
  typeAuthUser,
  typeLogin,
  typeLogOut,
  typeTestLogin,
  typeInitState,
} from '../modules/userAuthorization';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

// * =====================
// *   LOGIN_CONTAINER(CT)
// * =====================

function LoginContainer() {
  //* useDispatch
  const dispatch = useDispatch();
  const history = useHistory();

  let { isJoin, isAuth, isAdmin, userData, loginError } = useSelector(({ authorization }) => ({
    isJoin: authorization.isJoin,
    isAuth: authorization.isAuth,
    isAdmin: authorization.isAdmin,
    userData: authorization.userData, 
    loginError: authorization.loginError,                 // 존재하지 않는 유저코드로 접속하려 할 때 error 메시지 받음.
  }));
  
  const [uniqueNumber, setUniqueNumber] = useState('');   // 유저코드로 접속할 때 필요한 변수
  //* dispatch 'LOGIN_USER' type

  useEffect(() => {
    dispatch(typeAuthUser());   // 현재 유저의 정보를 우선적으로 받아옴.
  }, []);

  useEffect(() => {             // 존재하지 않는 유저코드로 접속하려 했을 때,
    if(loginError){
      Swal.fire({
          title: '<span style="color: white">등록되지 않은 유저 코드입니다.<span>',
          icon: 'error',
          background: '#292A33',
          confirmButtonColor: '#E96F02',
          confirmButtonText: 'OK!',
          customClass: {
            container: 'my-swal',
          },
        }).then((result) => {
        });
      dispatch(typeInitState());
    }
  }, [loginError]);

  useEffect(() => {
    //* 로그인 뒤 회원가입된 일반회원, 회원가입하는 회원, 관리자, 제재회원,
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

  useEffect(() => {     // 유저코드가 제재회원일 때,
    if (userData?.usercode && userData.usercode == 3){
      Swal.fire({
				title: '<span style="color: white">제재 회원입니다.<span>',
				icon: 'error',
				background: '#292A33',
				confirmButtonColor: '#E96F02',
				confirmButtonText: 'OK!',
				customClass: {
					container: 'my-swal',
				},
			}).then((result) => {
			});
      window.localStorage.removeItem('CURRENT_USER');
      dispatch(typeLogOut());
      history.push({ pathname: '/' });
    }
  }, [userData]);

  const onPressUniqueNumber = () => { 
    if (uniqueNumber == '') {                                                 // 유저 코드를 입력 안했을 때,
      Swal.fire({
				title: '<span style="color: white">코드를 입력해 주세요. <span>',
				icon: 'error',
				background: '#292A33',
				confirmButtonColor: '#E96F02',
				confirmButtonText: 'OK!',
				customClass: {
					container: 'my-swal',
				},
			}).then((result) => {
			});
    } else {                                                                  // 입력했다면 integer 타입으로 변형해 준다음 api 요청
      const formData = {
        oAuthId: Number(uniqueNumber)
      };
        dispatch(typeTestLogin(formData));
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
    <CommonLogin                                          // 유저코드로 입력 시
    uniqueNumber={uniqueNumber}
    setUniqueNumber={setUniqueNumber}
    onPressUniqueNumber={onPressUniqueNumber}
    />
      <KakaoLogin                                          // 카카오 로그인으로 접속 시
        socialLogin={socialLogin}
        setKakaoDialogOpen={setKakaoDialogOp}
        setKakaoDialogClose={setKakoDialogCl}
      />
    </>
  );
}

export default LoginContainer;
