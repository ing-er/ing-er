import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  
  & .drawer {
    width: 400;
    flex-shrink: 0;

    & .MuiDrawer-paper {
      width: 400;
    }
  }
  & .chevron-right {
    margin: 5 5 0 0;
    color: #ffffff;
    background-color: #1E1F26;
    border-radius: 5px;
  }
  & .drawer1-container {
    z-index: 10000;
  }
  & .drawerHeader-right-container {
    display: flex;
    padding: 10px 0 0 0;

    & .icon-button {
      color: #1E1F26;
      padding: 0 0.3rem;
    }
    & .drawer-span {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      overflow: hidden;
      position:absolute;
      border-radius: inherit;
      pointer-events: none;
      
    }
  }


`;
