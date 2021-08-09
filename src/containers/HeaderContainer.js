import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../layout/Header';
import { typeLogOut , typeAuthUser} from '../modules/userAuthorization';
import { useHistory } from 'react-router';
import {
  typeGetUserInfo,
} from '../modules/memberSetting';

function HeaderContainer() {

	const dispatch = useDispatch();
	const history = useHistory();

  const { isJoin, isAuth, state } = useSelector(({ authorization }) => ({
    isJoin: authorization.isJoin,
    isAuth: authorization.isAuth,
    state: authorization.state,
  }));

  useEffect(() => {
    dispatch(typeGetUserInfo());
    dispatch(typeAuthUser());
  }, []);

	const onLogOutHandler = () => {
    window.localStorage.removeItem('CURRENT_USER');
    dispatch(typeLogOut());
    history.push({ pathname: '/' });
  };

  return (
    <Header
			isJoin={isJoin}
			isAuth={isAuth}
			onLogOutHandler={onLogOutHandler}
    />
  );
}

export default HeaderContainer;