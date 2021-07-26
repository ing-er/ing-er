import { useState } from 'react';

import Wrapper from './styles';

const Screen = ({ screen_id }) => {
  const [sId, setSId] = useState(screen_id);

  return (
    <Wrapper>
      {sId ? (
        <div className="conference-content">

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
