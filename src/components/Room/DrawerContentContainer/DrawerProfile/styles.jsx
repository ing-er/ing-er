import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;

  & .name-container {
    display: flex;
    justify-content: center;
    & .name {
    }
  }
  & .calendar-container {
    margin: 0.3rem 0.3rem 0.1rem 0.3rem;
  }
  & .date-time-container {
    text-align: center;
    & .date {
      margin: 0.5rem 0;
      font-weight: 700;
    }
    & .time-text {
      font-weight: 400;
    }
    & .time {
      font-size: 3rem;
      font-weight: 800;
    }
  }
  & .pd-container {
    padding: 1rem;
    overflow: auto;
  }
  & .pd-content-container {
    margin-bottom: 1.5rem;
  }
  .textfield-grid {
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    border-radius: 30px;
    width: 100%;
  }
`;

export default Wrapper;
