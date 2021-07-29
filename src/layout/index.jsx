import Header from './Header';
import { Container, CssBaseline } from '@material-ui/core';
import Wrapper from './styles';

const Layout = (props) => {
  const { children, isEntrance } = props;

  return (
    <div>
      {isEntrance && (
        <Wrapper style={{ backgroundImage: 'url(img/inger_background.png)' }}>
          <CssBaseline />
          <Header />
          <Container className="content">
            <div className="container">{children}</div>
          </Container>
        </Wrapper>
      )}
      {!isEntrance && (
        <Wrapper>
          <CssBaseline />
          <Header />
          <Container className="content">
            <div className="container">{children}</div>
          </Container>
        </Wrapper>
      )}
    </div>
  );
};

export default Layout;
