import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 0.4rem;
  margin-left: 0.4rem;

  & .name-container {
    background-color: #080808;
    border-radius: 10px;
    box-shadow: 1px 1px 5px #c4c4c426, 0px 15px 90px 30px rgba(0,0,0,0.25);
    display: flex;
  }

  & .name-text { 
    color: #ffffff;
    font-family: 'Noto Sans KR';
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 300;
    margin: 0.5rem;
    letter-spacing: 5px;
  }
`

export default Wrapper;