import React, { useEffect } from 'react';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';
// import Wrapper from './styles';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

// const buttonBlock = {
//   color: 'white',
//   borderRadius: '9px',
//   fontSize: '24px',
//   background: '#292A33',
//   justifyContent: 'center',
//   padding: '200px 200px',
//   border: 0,
//   outline: 0,
//   margin: '10% 10% 10% 30%'
// };

const ButtoninnerText = styled.h3`
  margin: 0;
  font-size: 14px;
`;

const KakaoLogin = (props) => {
  let history = useHistory();
  //* FUNCTIONS
  let { socialLogin, isOpen, setKakaoDialogOpen, setKakaoDialogClose } = props;
  const responseKakao = (response) => {
    const { id } = response.profile;
    const { email } = response.profile.kakao_account;
    const userData = {
      oAuthId: id,
      email,
    };
    socialLogin(userData);
  };

  useEffect(() => {
    setKakaoDialogOpen();
  });

  const handleClose = () => {
    setKakaoDialogClose();
    history.goBack();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>
        <KaKaoLogin
          className="button-block"
          token={`c5f57e476f35237f124ae66b2d350e64`}
          buttonText="kakao"
          onSuccess={responseKakao}
          onFail={console.error}
          onLogout={console.info}
          // style={buttonBlock}
        >
          <ButtoninnerText>카카오 계정으로 로그인</ButtoninnerText>
        </KaKaoLogin>
      </DialogContent>
    </Dialog>
  );
};

//* PROP_TYPES
KakaoLogin.defaultProps = {
  socialLogin: () => null,
};
KakaoLogin.propTypes = {
  socialLogin: PropTypes.func,
};

export default KakaoLogin;
