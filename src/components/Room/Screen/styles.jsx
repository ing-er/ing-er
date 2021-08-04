import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ffffff;

  &:before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }

  & .conference-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  & .screen {
    width: 100%;
    height: 100%;
  }

`;

export default Wrapper;