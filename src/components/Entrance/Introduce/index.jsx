import { Container } from '@material-ui/core';
import React from 'react';
// import Wrapper from './styles';
// import background from './img/inger_background.png';

const index = () => {
  return (
    <Container
      classname="container"
      style={{
        // backgroundImage: 'url(./img/inger_background.png)',
        backgroundSize: '100%',
        margin: 0,
        padding: 0,
        height: '100vh',
        backgroundSize: 'cover',
        // weight: '140vw',
        // margin: 0,
        backgroundRepeat: 'no-repeat',
      }}
    ></Container>
  );
};

export default index;
