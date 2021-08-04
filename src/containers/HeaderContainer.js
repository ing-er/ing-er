import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../layout/Header';
import { typeLogOut } from '../modules/userAuthorization';
import { useHistory } from 'react-router';

function HeaderContainer() {

	const dispatch = useDispatch();
	const history = useHistory();

  const { isJoin, isAuth, state } = useSelector(({ authorization }) => ({
    isJoin: authorization.isJoin,
    isAuth: authorization.isAuth,
    state: authorization.state,
  }));

	const onLogOutHandler = () => {
    localStorage.removeItem('CURRENT_USER');
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