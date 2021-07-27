import { useState, useEffect } from 'react';

import DrawerProfile from './DrawerProfile';
import DrawerTodo from './DrawerTodo';
import DrawerPromise from './DrawerPromise';

import Wrapper from './styles';

const tmpStyle = {
  border: '1px solid red',
};

const DrawerContentContainer = ({ drawerId }) => {
  const [contentDiv, setContentDiv] = useState(<DrawerProfile />)

  /* drawerId에 따라 drawerContent 변경 */
  useEffect(() => {
    if (drawerId === 'drawerProfile'){
      setContentDiv(<DrawerProfile />)
    } else if (drawerId === 'drawerTodo') {
      setContentDiv(<DrawerTodo />)
    } else if (drawerId === 'drawerPromise') {
      setContentDiv(<DrawerPromise />)
    } else {
      setContentDiv(<DrawerProfile />)
    }
  }, [drawerId])

  return (
    <Wrapper style={tmpStyle}>
      { contentDiv }
    </Wrapper>
  );
};

export default DrawerContentContainer;
