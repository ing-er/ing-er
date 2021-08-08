import { useState, useEffect } from 'react';

import Wrapper from './styles';

const Name = ({ streamManager }) => {
  const [username, setUsername] = useState(undefined);

  /* username hook */
  useEffect(() => {
    if (!streamManager) return;

    const name = JSON.parse(streamManager?.stream.connection.data).clientData;
    setUsername(name);
  }, [streamManager]);

  return (
    <Wrapper>
      <div className="name-container">
        <p className="name-text">{username ? username : '익명의 잉어'}</p>
      </div>
    </Wrapper>
  );
};

export default Name;
