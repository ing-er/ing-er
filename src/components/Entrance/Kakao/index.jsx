// import React from 'react'
// import KaKaoLogin from 'react-kakao-login'

// responseKaKao = (res) => {
//     const { data } = this.state;

//     this.setState({
//       data: res,
//     });

//     fetch(`${API_URL_LOGIN}/user/signin/kakao`, {
//       //백엔드에서 원하는 형태의 endpoint로 입력해서 fetch한다. 
//       method: 'GET',
//       headers: {
//         Authorization: res.response.access_token,
//         //받아오는 response객체의 access_token을 통해 유저 정보를 authorize한다. 
       
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => localStorage.setItem('token', res.token), 
//             //백엔드에서 요구하는 key 값(token)으로 저장해서 localStorage에 저장한다.
//             //여기서 중요한것은 처음에 console.log(res)해서 들어오는 
//             //access_token 값을 백엔드에 전달해줘서 백엔드에 저장 해두는 
//             //절차가 있으므로 까먹지 말 것! 
//             alert('로그인 성공하였습니다'));
//   };

// const index = () => {
//     return (
//         <KaKaoBtn
//     //styled component 통해 style을 입혀 줄 예정 
//                 jsKey={'c5f57e476f35237f124ae66b2d350e64'}
//     //카카오에서 할당받은 jsKey를 입력
//                 buttonText='카카오 계정으로 로그인'
//     //로그인 버튼의 text를 입력
//                 onSuccess={this.responseKaKao}
//     //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장 
//                 getProfile={true}
//               />
//     )
// }

// export default index
