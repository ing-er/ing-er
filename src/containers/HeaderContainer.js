import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../layout/Header';
import { typeLogOut } from '../modules/userAuthorization';
import { useHistory } from 'react-router';

function HeaderContainer() {

	const dispatch = useDispatch();
	const history = useHistory();

  const { isJoin, isAuth } = useSelector(({ authorization }) => ({
    isJoin: authorization.isJoin,
    isAuth: authorization.isAuth,
  }));

	const onLogOutHandler = () => {
    localStorage.removeItem('CURRENT_USER');
    dispatch(typeLogOut());
    history.push({ pathname: '/' });
  };

  const onLoginHandler = () => {
    if (!isAuth){
      alert('로그인 하셔야 입장 가능합니다.')
    } else {
      if(isJoin){
        history.push({ pathname: '/joinsetting' });
      } else {
        history.push({ pathname: '/' });
      }
    }
  };


  return (
    <Header
			isJoin={isJoin}
			isAuth={isAuth}
			onLogOutHandler={onLogOutHandler}
      onLoginHandler={onLoginHandler}
    />
  );
}

export default HeaderContainer;