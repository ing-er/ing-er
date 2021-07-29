import { useState, useEffect } from 'react';

import TodolistContainer from '../../../containers/MyTodolistContainer';
import DrawerProfile from './DrawerProfile';
import DrawerTodo from './DrawerTodo';
import DrawerPromise from './DrawerPromise';

import Wrapper from './styles';


const DrawerContentContainer = ({ drawerId }) => {
  const [contentDiv, setContentDiv] = useState(<DrawerProfile />)

  /* drawerId에 따라 drawerContent 변경 */
  useEffect(() => {
    if (drawerId === 'drawerProfile'){
      setContentDiv(<DrawerProfile />)
    } else if (drawerId === 'drawerTodo') {
      setContentDiv(
        <TodolistContainer>
          <DrawerTodo />
        </TodolistContainer>
      )
    } else if (drawerId === 'drawerPromise') {
      setContentDiv(<DrawerPromise />)
    } else {
      setContentDiv(<DrawerProfile />)
    }
  }, [drawerId])

  return (
    <Wrapper>
      { contentDiv }
    </Wrapper>
  );
};

export default DrawerContentContainer;
