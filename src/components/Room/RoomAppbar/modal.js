import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCalendarSetDate } from '../../../modules/setCalendar';

import { getToday } from '../../../utils/date';

import { motion } from 'framer-motion';
import { Button } from '@material-ui/core';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: '-110vh',
    opacity: 0,
  },
  visible: {
    y: '200px',
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const Modal = ({ showModal, setShowModal, handleLeaveSession }) => {
  const dispatch = useDispatch();
  const { requestcalendar } = useSelector((state) => state.setCalendar);
  const [myPromise, setMyPromise] = useState('');

  /* constructor */
  useEffect(() => {
    const today = getToday();
    dispatch(setCalendarSetDate(today));

    const _promise = requestcalendar.promise
    setMyPromise(_promise);
  }, [])

  /* requestcalendar hook */
  useEffect(() => {
    const today = getToday();
    const currDate = requestcalendar.date;
    if (currDate !== today) return
    
    const _promise = requestcalendar.promise
    setMyPromise(_promise)
  }, [requestcalendar]);

  return (
    <>
      {showModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <p>오늘 이런 다짐을 하셨네요!</p>
            <div className="promise-container">
              <p className="promise">
                {myPromise ? myPromise : '오늘 작성한 다짐이 없습니다.'}
              </p>
            </div>
            <p>정말로 나가시겠어요?</p>
            <div className="button-container">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLeaveSession}
              >
                나가기
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowModal(false)}
              >
                취소
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
