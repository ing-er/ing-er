import { useState, useEffect, useRef } from 'react';

import { getStudyTime } from '../../../../api/timer/timer';
import { getToday } from '../../../../utils/date';

import Wrapper from './styles';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const Timer = ({
  streamManager,
  isLocal,
  isLocalVideoActive,
  studyTime,
  onIncrease,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  /* interval hook */
  useInterval(
    () => {
      if (isLocal) {
        onIncrease();
      } else {
        setSeconds(seconds + 1);
      }
    },
    isRunning ? 1000 : null,
  );

  /* streamManager 초기화 또는 상태 변경 시 */
  useEffect(() => {
    if (!streamManager) return;

    const userData = JSON.parse(streamManager?.stream.connection.data).clientData;
    const userId = userData.id;
    
    if (!isLocal) {
      getStudyTime(userId, getToday())
        .then((response) => {
          const secs = response.data.studyTime
          setSeconds(secs)
        })
    }
  }, [streamManager]);

  /* local video hook*/
  useEffect(() => {
    if (isLocal) {
      setIsRunning(isLocalVideoActive);
    }
  }, [isLocalVideoActive]);

  /* remote streamManager hook */
  useEffect(() => {
    if (!isLocal) {
      setIsRunning(streamManager.stream.videoActive);
    }
  }, [streamManager?.stream.videoActive]);

  return (
    <Wrapper>
      <div className="timer-container">
        <div className="timer-col">
          <p className="timer-label">
            {isLocal
              ? studyTime < 36000
                ? '0' + parseInt(studyTime / 3600)
                : parseInt(studyTime / 3600)
              : seconds < 36000
                ? '0' + parseInt(seconds / 3600)
                : parseInt(seconds / 3600)}
          </p>
        </div>
        <div className="timer-col">
          <p className="timer-label">
            {isLocal
              ? parseInt((studyTime % 3600) / 60) < 10
                ? '0' + parseInt((studyTime % 3600) / 60)
                : parseInt((studyTime % 3600) / 60)
              : parseInt((seconds % 3600) / 60) < 10
                ? '0' + parseInt((seconds % 3600) / 60)
                : parseInt((seconds % 3600) / 60)}
          </p>
        </div>
        <div className="timer-col">
          <p className="timer-label">
            {isLocal
              ? studyTime % 60 < 10
                ? '0' + (studyTime % 60)
                : studyTime % 60
              : seconds % 60 < 10
                ? '0' + (seconds % 60)
                : seconds % 60}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Timer;
