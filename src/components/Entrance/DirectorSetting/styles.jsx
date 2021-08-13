import styled from 'styled-components';

const Wrapper = styled.div`
  & .main-container {
    box-shadow: '0px 0px 0px rgb(255, 255, 255)';
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
  & .header {
    display: flex;
    justify-content: space-between;

    & .MuiToolbar-gutters {
      padding-left: 0;
      padding-right: 0;
    }
  }
  & .contents-container {
    width: 100%;
    margin: 10px 0;
  }

  & .infos-container {
    display: flex;
    justify-content: space-between;
  }
  .category-container {
    margin-bottom: 100px;
  }

  & .update-button-container {
    display: flex;
    justify-content: center;
  }
  & .add-button-container {
    align-self: center;
  }
  & .button {
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

  & .managament-container {
    display: flex;
    justify-content: space-between;
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
  & .my-table-container {
    display: flex;
    justify-content: center;
  }
  & .my-table-item {
  }
`;

export default Wrapper;
