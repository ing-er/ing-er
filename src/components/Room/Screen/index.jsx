import { useState, useEffect, useRef } from 'react';

import Timer from './Timer';
import Name from './Name';
import Rest from './Rest';

import Wrapper from './styles';
import { motion } from 'framer-motion';

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
        <motion.div className="conference-content"
          whileHover={{ 
            scale: 1.1,
            textShadow: "0px 0px 8px rgb(255, 255, 255)",
            boxShadow: "0px 0px 8px rgb(255, 255, 255)"
          }}
        >
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
          <div>
            <video
              className="screen"
              autoPlay={true}
              ref={videoRef}
            />
          </div>
        </motion.div>
      ) : (
        <div>
          <p>empty</p>
        </div>
      )}
    </Wrapper>
  )
}

export default Screen;
