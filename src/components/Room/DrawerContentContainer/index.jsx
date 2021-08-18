import { useState, useEffect } from 'react';

import DrawerTodoContainer from '../../../containers/DrawerTodoContainer';
import DrawerProfileContainer from '../../../containers/DrawerProfileContainer';
import DrawerTodo from './DrawerTodo';

import Wrapper from './styles';

const DrawerContentContainer = ({ drawerId, currentUserData }) => {
  const [drawer, setDrawer] = useState(0);

  /* drawerId에 따라 drawerContent 변경 */
  useEffect(() => {
    if (drawerId === 'drawerProfile') {
      setDrawer(0);
    } else {
      setDrawer(1);
    }
  }, [drawerId]);

  return (
    <Wrapper>
      {drawer === 0 ? (
        <DrawerProfileContainer currentUserData={currentUserData} />
      ) : (
        <DrawerTodoContainer>
          <DrawerTodo />
        </DrawerTodoContainer>
      )}
    </Wrapper>
  );
};

export default DrawerContentContainer;
