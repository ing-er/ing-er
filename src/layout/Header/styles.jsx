import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  height: 110px;
  top: 0;
  left: 0;
  & .appbar {
    width: 100%;
    height: 50px;
    background-color: transparent;
    /* background-color: #1E1F26; */
    box-shadow: none;
  }
  & .header-grid {
    position: absolute;
  }
  & .header-button {
    box-shadow: none;
    background-color: transparent;
    color: white;
  }
  & .logo {
    padding-left: 10px;
    color: white;
    cursor: pointer;
  }
  & .menu-button {
    position: fixed;
    left: 12px;
    top: 14px;
    z-index: 1300;
    margin-left: 0;
    width: 23px;
    height: 20px;
    cursor: pointer;
    & div {
      width: 100%;
      height: 3px;
      background: #fff;
      border-radius: 30px;
    }
  }
  & .display-none {
    display: block;
  }
`;

export default Wrapper;
