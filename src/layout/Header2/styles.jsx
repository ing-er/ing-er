import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  height: 70px;

  & .header-container {
    position: fixed;
    z-index: 1500;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 0.4rem;
    background-color: transparent;
    box-shadow: none;
    transition: all .3s ease;
  }
  & .hide {
    top: -70px;
  }
  & .logo {
    width: 4rem;
    padding: 0.7rem;
    color: white;
    cursor: pointer;
  }

  & .login-button {
    border-radius: 1.25rem;
    color: white;
    font-weight: bold;
    background-color: #E96F02;
    margin: 0.5rem;

    &:hover {
      background-color: white;
      color: #E96F02;
    }
  }

  & .setting-container {
    display: flex;
  }
`;

export default Wrapper;
