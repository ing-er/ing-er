import styled from 'styled-components';

const Wrapper = styled.div`
  .all-container {
    max-width: 1000px;
  }
  &.name-input {
    background-color: transparent;
    border: none;
    color: white;
    width: 90%;
    height: 100%;
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
    font-family: 'regular';
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
    font-family: 'regular';
  }
  .duple {
    border-radius: 1.25rem;
    color: white;
    font-weight: bold;
    background-color: #e96f02;
    font-family: 'regular';
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
  .withdrawal {
    border-radius: 1.25rem;
    color: white;
    font-weight: bold;
    background-color: #cd0c22;
    font-family: 'regular';
    &:hover {
      background-color: white;
      color: #cd0c22;
    }
  }
`;

export default Wrapper;
