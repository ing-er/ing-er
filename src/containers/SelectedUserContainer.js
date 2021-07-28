import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedUserInfo,
} from '../modules/selectedUserInfo';

import Room from '../pages/Room';

const SelectedUserContainer = () => {
  const { selectedUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  const setSelectedUser = (userId) => {
    dispatch(setSelectedUserInfo(userId));
  };

  return (
    <Room
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
    />
  );
};

export default SelectedUserContainer;
