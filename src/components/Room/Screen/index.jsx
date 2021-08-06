import { useState, useEffect, useRef } from 'react';

import Wrapper from './styles';

const Screen = ({ streamManager }) => {
  let videoRef = useRef();

  /* subscriber hook */
  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current)
    }
  }, [streamManager])

  const getUsername = () => {
    return JSON.parse(streamManager.streamManager.stream.connection.data).clientData;
  }

  return (
    <Wrapper>
      {streamManager !== undefined ? (
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
