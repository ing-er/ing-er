import styled from 'styled-components';

const Wrapper = styled.div`
  place-self: flex-end;
  width: fit-content;

  & .timer-container {
    background-color: #080808;
    border-radius: 10px;
    box-shadow: 1px 1px 5px #c4c4c426, 0px 15px 90px 30px rgba(0,0,0,0.25);
    display: flex;
  }
  & .timer-col {
    text-align: center;
    margin: 0 0.7rem 0 0.7rem;
    min-width: 15px;
    position: relative;

    &:not(:last-child):before,
    &:not(:last-child):after{
      content: "";
      background-color: rgba(255,255,255,.3);
      height: 2.5px;
      width: 2.5px;
      border-radius: 50%;
      display: block;
      position: absolute;
      right: -11px;
    }
    &:not(:last-child):before {
      top: 35%;
    }
    &:not(:last-child):after {
      top: 57%;
    }
  }
  & .timer-timer {
    &:before {
      color: #fff;
      font-size: 4.2rem;
      text-transform: uppercase;
    }
  }
  & .timer-label {
    color: #ffffff;
    text-transform: uppercase;
    font-size: 0.7rem;
    margin: 0.5rem 0;
    letter-spacing: 5px;
  }
`

export default Wrapper;
