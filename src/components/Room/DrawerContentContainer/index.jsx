import { useState, useEffect } from 'react';

import TodolistContainer from '../../../containers/MyTodolistContainer';
import DrawerProfile from './DrawerProfile';
import DrawerProfileContainer from '../../../containers/DrawerProfileContainer';
import DrawerTodo from './DrawerTodo';
import DrawerPromise from './DrawerPromise';

import Wrapper from './styles';

const DrawerContentContainer = ({ drawerId }) => {
  const [contentDiv, setContentDiv] = useState(<DrawerProfileContainer />);

  /* drawerId에 따라 drawerContent 변경 */
  useEffect(() => {
    if (drawerId === 'drawerProfile') {
      setContentDiv(<DrawerProfileContainer />);
    } else if (drawerId === 'drawerTodo') {
      setContentDiv(
        <TodolistContainer>
          <DrawerTodo />
        </TodolistContainer>,
      );
    } else if (drawerId === 'drawerPromise') {
      setContentDiv(<DrawerPromise />);
    } else {
      setContentDiv(<DrawerProfile />);
    }
  }, [drawerId]);

  return <Wrapper>{contentDiv}</Wrapper>;
};

export default DrawerContentContainer;
