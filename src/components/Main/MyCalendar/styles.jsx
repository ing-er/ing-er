import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1500px;
  & .all-container {
    text-align: center;
    padding: 10px 30px 30px 30px;
  }
  .textfield-grid {
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    border-radius: 30px;
    width: 80%;
  }
  .calendar-container {
    background-color: white;
    padding: 5%;
    border-radius: 30px;
  }
  .calendar {
    width: 100%;
    border: none;
  }
`;

export default Wrapper;
