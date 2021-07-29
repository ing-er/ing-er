import React from 'react';
import Layout from '../../layout';
// import IntroduceContainer from '../../containers/IntroduceContainer';
import Introduce from '../../components/Entrance/Introduce';

const Entrance = () => {
  return (
    <Layout isEntrance={true}>
      <Introduce />
    </Layout>
  );
};

export default Entrance;
