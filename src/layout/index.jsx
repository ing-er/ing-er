import Header from './Header';
import { Container, CssBaseline } from '@material-ui/core';
import Wrapper from './styles';

const Layout = props => {
  const { children } = props;

  return (
    <div>
      <Wrapper>
        <CssBaseline />
        <Header />
        <Container className="content" maxWidth="xl">
        <div className="container">{children}</div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default Layout;