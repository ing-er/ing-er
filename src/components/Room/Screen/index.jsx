import { useEffect, useRef } from 'react';

import Timer from './Timer';
import Name from './Name';
import Rest from './Rest';
import Wrapper from './styles';

const Screen = ({ streamManager, isVideoActive }) => {
  let videoRef = useRef();

  /* subscriber hook */
  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current)
    }
  }, [streamManager])

  useEffect(() => {
    console.log(isVideoActive)
  }, [isVideoActive])

  const getUsername = () => {
    return JSON.parse(streamManager.streamManager.stream.connection.data).clientData;
  }

  return (
    <Wrapper>
      {streamManager !== undefined ? (
        <div className="conference-content">
          <div className="screen-header-container">
            <Name />
            <Timer streamManager={streamManager} />
          </div>
          {isVideoActive ? (
            null
          ) : (
            <Rest />
          )}
          <video
            className="screen"
            autoPlay={true}
            ref={videoRef}
          />
        </div>
      ) : (
        <div>
          <p>empty</p>
        </div>
      )}
    </Wrapper>
  )
}

export default Screen;
