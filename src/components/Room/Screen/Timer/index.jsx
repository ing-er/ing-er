import { useState, useEffect, useRef } from 'react';

import Wrapper from './styles';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay])
}

const Timer = ({ streamManager, isLocal, isLocalVideoActive }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  /* interval hook */
  useInterval(() => {
    setSeconds(seconds + 1);
  }, isRunning ? 1000 : null);

  /* local video hook*/
  useEffect(() => {
    if (isLocal) {
      setIsRunning(isLocalVideoActive)
    }
  }, [isLocalVideoActive])

  /* remote streamManager hook */
  useEffect(() => {
    if (!isLocal) {
      setIsRunning(streamManager.stream.videoActive)
    }
  }, [streamManager?.stream.videoActive])


  return (
    <Wrapper>
      <div className="timer-container">
        <div class="timer-col">
          <p class="timer-label">{(seconds < 36000) ? '0'+ parseInt(seconds / 3600) : parseInt(seconds / 3600)}</p>
        </div>
        <div class="timer-col">
          <p class="timer-label">{(seconds < 600) ? '0'+ parseInt(seconds / 60) : parseInt(seconds / 60)}</p>
        </div>
        <div class="timer-col">
          <p class="timer-label">{(seconds % 60 < 10) ? '0'+ (seconds % 60) : seconds % 60}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Timer;
