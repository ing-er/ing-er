import { useState, useEffect, useRef } from 'react';

import Wrapper from './styles';

const Screen = ({ screen_id, publisher }) => {
  const [sId, setSId] = useState(screen_id);
  const videoRef = useRef(undefined);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      publisher.addVideoElement(videoRef.current)
    }
  })

  return (
    <Wrapper>
      {publisher ? (
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
