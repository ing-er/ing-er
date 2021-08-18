import React from 'react';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';
// import Wrapper from './styles';
import PropTypes from 'prop-types';

const ButtoninnerText = styled.h3`
  margin: 0;
  font-size: 14px;
`;

const KakaoLogin = ({ socialLogin }) => {
  const responseKakao = (response) => {
    const { id } = response.profile;
    const { email } = response.profile.kakao_account;
    const userData = {
      oAuthId: id,
      email,
    };
    socialLogin(userData);
  };

  return (
    <KaKaoLogin
      className="button-block"
      token={`c5f57e476f35237f124ae66b2d350e64`}
      buttonText="kakao"
      onSuccess={responseKakao}
      onFail={console.error}
      onLogout={console.info}
      style={{
        margin: '0px 50px 10px',
        borderRadius: '0.75rem',
        color: 'white',
        border: '0',
        fontWeight: 'bold',
        fontFamily: 'regular',
        backgroundColor: '#ffeb00',
        color: 'black',
        marginRight: '1rem',
        width: '200px',
        height: '50px',
      }}
    >
      <ButtoninnerText>카카오 계정으로 로그인</ButtoninnerText>
    </KaKaoLogin>
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
