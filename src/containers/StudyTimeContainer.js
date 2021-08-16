import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { increase } from '../modules/studyTime';

const StudyTimecontainer = ({ children }) => {
  let { studyTime } = useSelector(state => state.studyTime );
  studyTime = studyTime ? studyTime : 0;
  const dispatch = useDispatch();

  const onIncrease = () => {
    return dispatch(increase())
  }

  return (
    React.cloneElement(children, {
      studyTime,
      onIncrease,
    })
  )
}

export default StudyTimecontainer;