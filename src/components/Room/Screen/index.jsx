import { useState, useEffect, useRef } from 'react';

import Wrapper from './styles';

const Screen = ({ subscriber }) => {
  const videoRef = useRef(undefined);

  /* subscriber hook */
  useEffect(() => {
    if (subscriber && videoRef.current) {
      subscriber.getStreamManager().addVideoElement(videoRef.current)
    }
  }, [subscriber])

  return (
    <Wrapper>
      {subscriber !== undefined ? (
        <div className="conference-content">
          <video
            className="screen"
            autoPlay={true}
            ref={videoRef}
          />
        </div>
      ) : (
        <div>
          <p>아직 입장하지 않음</p>
        </div>
      )}
    </Wrapper>
  )
}

export default Screen;
