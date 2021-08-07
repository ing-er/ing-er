import { useState, useEffect, useRef } from 'react';

import Wrapper from './styles';

const Timer = ({ streamManager }) => {
  let timerRef = useRef();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  
  /* constructor hook */
  useEffect(() => {
    
    timerRef = setInterval(tick, 1000);
    console.log('??')
    
    return (() => {
      clearInterval(timerRef);
    })
  });
  
  const tick = () => {
    if (isRunning) {
      const s = seconds + 1
      setSeconds(s)
    }
  }

  // useEffect(() => {
  //   if (!streamManager) return;
  //   const totalStreamSeconds = parseInt( (+new Date() - streamManager.stream.creationTime) / 1000);
  //   console.log(totalStreamSeconds);
  // }, [streamManager]);


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
