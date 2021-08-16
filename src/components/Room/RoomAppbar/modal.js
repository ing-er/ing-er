import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCalendarSetDate } from '../../../modules/setCalendar';

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
  const printTodayPromise = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let todaydate = year + '-' + month + '-' + day;
    dispatch(setCalendarSetDate(todaydate));
    console.log(requestcalendar.promise);
    return requestcalendar.promise;
  };

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
              <p className="promise"></p>
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
