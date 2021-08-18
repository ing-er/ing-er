import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../layout/Header';
// import Header from '../layout/Header';
import { typeLogOut , typeAuthUser} from '../modules/userAuthorization';
import { useHistory } from 'react-router';


function HeaderContainer() {

	const dispatch = useDispatch();
	const history = useHistory();

  const { isJoin, isAuth, isAdmin } = useSelector(({ authorization }) => ({
    isJoin: authorization.isJoin,
    isAuth: authorization.isAuth,
    isAdmin: authorization.isAdmin,
  }));

  useEffect(() => {
    dispatch(typeAuthUser());
  }, []);

	const onSettingHandler = () => {
    if (isAdmin){
      history.push({ pathname: '/adminsetting' });
    } else {
      history.push({ pathname: '/joinsetting' });
    };
  };

	const onLogOutHandler = () => {
    window.localStorage.removeItem('CURRENT_USER');
    dispatch(typeLogOut());
    history.push({ pathname: '/' });
  };

  return (
    <Header
			isJoin={isJoin}
			isAuth={isAuth}
      isAdmin={isAdmin}
      onSettingHandler={onSettingHandler}
			onLogOutHandler={onLogOutHandler}
    />
  );
}

export default HeaderContainer;