import styled from 'styled-components';

const Wrapper = styled.div`
  & .title-container {
    padding: 10px;
    border-radius: 30px;
    /* margin-bottom: 10px; */
  }
  & .title-subcontainer {
    justify-content: center;
  }
  & .title-input {
    background-color: transparent;
    border: none;
    /* color: white; */
    width: 80%;
    height: 100%;
    font-size: 20px;
    :focus {
      outline: none;
    }
  }
  & .input-container {
    text-align: center;
  }
`;

export default Wrapper;
