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
    padding-top: 52.65%;
  }

  & .conference-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

export default Wrapper;