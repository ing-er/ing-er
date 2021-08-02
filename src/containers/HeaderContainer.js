import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../layout/Header';

function HeaderContainer() {

  const { isJoin, isAuth } = useSelector(({ authorization }) => ({
    isJoin: authorization.isJoin,
    isAuth: authorization.isAuth,
  }));

  return (
    <Header
			isJoin={isJoin}
			isAuth={isAuth}
    />
  );
}

export default HeaderContainer;