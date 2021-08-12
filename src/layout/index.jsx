import Header from './Header';
import { Container, CssBaseline, Hidden } from '@material-ui/core';
import Wrapper from './styles';
import HeaderContainer from '../containers/HeaderContainer';

const Layout = (props) => {
  const { children, isEntrance } = props;

  return (
    <div>
      {isEntrance && (
        <Wrapper
          style={{
            backgroundImage: 'url(img/inger_background5.png)',
            backgroundSize: 'cover',
          }}
        >
          <CssBaseline />
          <HeaderContainer />
          <Container className="content">
            <div className="container">{children}</div>
          </Container>
        </Wrapper>
      )}
      {!isEntrance && (
        <Wrapper>
          <CssBaseline />
          <HeaderContainer />
          <Container className="content">
            <div className="container">{children}</div>
          </Container>
        </Wrapper>
      )}
    </div>
  );
};

export default Layout;
