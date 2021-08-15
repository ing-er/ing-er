import styled from 'styled-components';

const Wrapper = styled.div`
  & .screen-item-container {
    max-width: 640px;
    margin: auto;

    @media (max-width: 430px) {
      max-width: 350px;
    }
  }

  
`

export default Wrapper;