import { useState, useEffect, useRef } from 'react';

import Timer from './Timer';
import Name from './Name';
import Rest from './Rest';
import Wrapper from './styles';

const Screen = ({ streamManager, isLocalVideoActive, isLocal }) => {
  let videoRef = useRef();
  const [username, setUsername] = useState(undefined)

  /* subscriber hook */
  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current)

      // username 초기화
      const name = JSON.parse(streamManager?.stream.connection.data).clientData;
      setUsername(name);
    }

  }, [streamManager])

  return (
    <Wrapper>
      {streamManager !== undefined ? (
        <div className="conference-content">
          <div className="screen-header-container">
            <Name username={username} />
            <Timer
              streamManager={streamManager}
              username={username}
              isLocal={isLocal}
              isLocalVideoActive={isLocalVideoActive}
            />
          </div>
          {isLocal && !isLocalVideoActive && (
            <Rest />
          )}
          {!isLocal && !streamManager.stream.videoActive && (
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
