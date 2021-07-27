import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1500px;
  & .all-container {
    padding: 30px;
  }
  & .todolist-container {
    margin-top: 20px;
    padding: 20px;
  }
  & .title-container {
    padding: 10px;
    border-radius: 30px;
    margin-bottom: 10px;
  }
  & .title-subcontainer {
    justify-content: center;
  }
  & .content-container {
    padding: 20px;
    border-radius: 30px;
  }
  & .title-input {
    background-color: transparent;
    border: none;
    color: white;
    width: 80%;
    height: 100%;
    font-size: 20px;
    :focus {
      outline: none;
    }
  }
  & .content-input {
    background-color: transparent;
    border: none;
    color: white;
    width: 100%;
    height: 100%;
    font-size: 18px;
    :focus {
      outline: none;
    }
  }
  & .content-input-complete {
    background-color: transparent;
    border: none;
    color: #4d4d4d;
    width: 100%;
    height: 100%;
    font-size: 18px;
    :focus {
      outline: none;
    }
  }
  & .input-container {
    text-align: center;
  }
`;

export default Wrapper;
