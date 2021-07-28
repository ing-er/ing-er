import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;

  & .nickname-container {
    display: flex;
    justify-content: center;
    margin: 1.3rem 0;
    & .nickname {
  
    }
  }
  & .calendar-container {
    margin: 1rem 1rem 0.7rem 1rem;
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
    height: 300px;
    overflow: auto; 
  }
  & .pd-content-container {
    height: 270px;
  }
`;

export default Wrapper;