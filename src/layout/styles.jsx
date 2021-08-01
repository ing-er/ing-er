import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background-color: #1e1f26;
  /* overflow: 'hidden'; */
  .content {
    min-height: 1000px;
    color: white;
  }
  .MuiContainer-root {
    padding-left: 0;
    padding-right: 0;
  }

  /* @media (min-width: 600px) {
    .MuiContainer-root .MuiContainer-maxWidthLg {
      margin: 0;
      padding: 0;
      border: 0;
      min-width: 100%;
      max-width: 100%;
    }
  } */
`;

export default Wrapper;
