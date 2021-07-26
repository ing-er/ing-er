import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 666px;
  display: flex;
  
  & .drawer {
    width: 300px;
    flex-shrink: 0;

    & .MuiDrawer-paper {
      width: 300px;
    }
  }
`;
