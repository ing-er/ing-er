import { Container } from '@material-ui/core';
import React from 'react';
// import Wrapper from './styles';
// import background from './img/inger_background.png';

const index = () => {
  return (
    <Container
      className="container"
      style={{
        backgroundSize: '100%',
        margin: 0,
        padding: 0,
        height: '100vh',
        // backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    ></Container>
  );
};

export default index;
