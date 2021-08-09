import { useState, useEffect, useRef } from 'react';

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

const Timer = ({ streamManager, isLocal, isLocalVideoActive }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  /* interval hook */
  useInterval(
    () => {
      setSeconds(seconds + 1);
    },
    isRunning ? 1000 : null,
  );

  /* streamManager 초기화 또는 상태 변경 시 */
  useEffect(() => {
    if (!streamManager) return;

    /* 현재시간 계산
     * db에 1분 단위로 총 공부시간을 전송하고,
     * curr_time을 총 공부 시간으로 초기화
     * props username으로 api 호출
     */
    const username = JSON.parse(streamManager?.stream.connection.data).clientData;
    console.log('현재 또는 변화한 사용자: ' + username);

    const curr_time = parseInt((+new Date() - streamManager.stream.connection.creationTime) / 1000);
    setSeconds(curr_time);
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
            {seconds < 36000
              ? '0' + parseInt(seconds / 3600)
              : parseInt(seconds / 3600)}
          </p>
        </div>
        <div className="timer-col">
          <p className="timer-label">
            {seconds < 600
              ? '0' + parseInt(seconds / 60)
              : parseInt(seconds / 60)}
          </p>
        </div>
        <div className="timer-col">
          <p className="timer-label">
            {seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Timer;
