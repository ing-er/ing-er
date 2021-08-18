import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 22px 3px rgba(255,255,255,0.21); 
  box-shadow: 0px 0px 22px 3px rgba(255,255,255,0.21);
  background-color: black;
  color: #ffffff;

  &:before {
    content: '';
    display: block;
    padding-top: 75%;
  }

  & .conference-content {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    cursor: pointer;
  }
  & .screen {
    width: 100%;
    height: 100%;
    border-radius: 7px;
    margin-bottom: -7px;
  }

  & .screen-header-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    padding: 7px;
  }

  & .empty-img {
    width: 10%;
  }
`;

export default Wrapper;