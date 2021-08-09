import styled from 'styled-components';

const Wrapper = styled.div`
  .all-container {
    max-width: 1000px;
  }
  .name-input {
    background-color: transparent;
    border: none;
    color: white;
    width: 90%;
    height: 100%;
    font-size: 20px;
    :focus {
      outline: none;
    }
  }
  .category-container {
    margin-bottom: 100px;
  }
  .button {
    width: 100%;
    height: 50px;
    align-items: center;
    color: white;
    background: #292a33;
    padding: 0.375rem 0.75rem;
    border-radius: 1.25rem;
    font-size: 1rem;
    line-height: 1.5;
    transform: translateY(4px);
    border: 0;
    outline: 0;
  }
  .check {
    color: white;
    background: #e96f02;
    padding: 10px;
    border-radius: 3rem;
    font-size: 1rem;
    line-height: 1.5;
    transform: translateY(4px);
    border: 0;
    outline: 0;
  }
  .cancel {
    color: white;
    background: #292a33;
    padding: 10px;
    border-radius: 3rem;
    font-size: 1rem;
    line-height: 1.5;
    transform: translateY(4px);
    border: 0;
    outline: 0;
  }
`;

export default Wrapper;
