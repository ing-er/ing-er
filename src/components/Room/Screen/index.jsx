import { useState, useEffect, useRef } from 'react';

import Wrapper from './styles';

const Screen = ({ subscriber }) => {
  let videoRef = useRef(null);

  /* subscriber hook */
  useEffect(() => {
    if (subscriber && !!videoRef) {
      subscriber.addVideoElement(videoRef.current)
    }
  }, [subscriber])

  const getUsername = () => {
    return JSON.parse(subscriber.streamManager.stream.connection.data).clientData;
  }

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
