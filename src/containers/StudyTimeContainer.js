import React from 'react';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increase } from '../modules/studyTime';

const StudyTimecontainer = ({ children }) => {
  const { studyTime } = useSelector(state => state.studyTime );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(studyTime)
  }, [])
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