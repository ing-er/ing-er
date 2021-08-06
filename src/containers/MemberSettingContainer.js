// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import MemberSetting from '../components/Entrance/MemberSetting';
// import {
//   typeGetUserInfo,
//   typeInitInfo,
//   typeUpdateUserInfo,
// } from '../modules/memberSetting';
// import {
//   typeAuthUser,
//   typeCompleteJoinUser,
//   typeWithdrawal,
// } from '../modules/userAuthorization';

// import { useHistory } from 'react-router';

// function MemberSettingContainer() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   // useSelector는 리덕스 스토어의 상태를 조회.
//   // useSelector를 통해 rootReducer에 있는 타 모듈을 불러옴.
//   let { kakaoIdNum, isJoin, isAuth, info, uinfo, authinfo } = useSelector(({authorization, memberSetting }) => ({
//     kakaoIdNum: authorization.kakaoIdNum,
//     isJoin: authorization.isJoin,
//     isAuth: authorization.isAuth,
//     info: memberSetting.info,
//     uinfo: authorization.uinfo,
    
//     authinfo: authorization.AUTH_S,
//   }));

//   const [name, setname] = useState('');
//   const [category, setCategory] = useState('');
//   const [isOpen, setisOpen] = useState('');
//   const [isDupl, setIsDupl] = useState('');
//   // const originName = info.name;


//   useEffect(() => {
//     dispatch(typeGetUserInfo());
//     dispatch(typeAuthUser());
//   }, []);

//   useEffect(() => {
//     setname(info.name);
//     setCategory(info.category);
//     setisOpen(info.isOpen);
//     // history.push({ pathname: '/main' });
//   }, [info]);

//   // console.log(info.message)
//   // useEffect(() => {
//   //   console.log('첫번째 effent')
//   //   if (info.message === 'Success'){
//   //     history.push({ pathname: '/main' });
//   //   }
//   // }, [info]);

//   useEffect(() => {
//     console.log('두번째 effect')
//     if (authinfo?.message === 'Success'){
//       history.push({ pathname: '/main' });
//     }
//   }, [authinfo]);

//   useEffect(() => {
//     if (uinfo?.message){
//       history.push({ pathname: '/' });
//     }
//   }, [uinfo]);

//   useEffect(() => {

//   })

//   const onUpdateInfo = () => {
//     // if (originName === name){
//     //   console.log('ori name')
//     //   console.log(originName)
//     //   console.log(name)
//     //   setIsDupl(1)
//     // }
//     // console.log(isDupl)
//     if(name != undefined && 2 <= name.length && name.length <= 6 && category != undefined && isOpen != undefined && isDupl === 1){
//       const data = {
//         "category": Number(category),
//         "isOpen": isOpen,
//         "kakaoIdNum": window.localStorage.getItem('CURRENT_USER'),
//         "name": name,
//       };
//       if (isAuth && !isJoin){
//         console.log('du여러번')
//         console.log(data)
//         dispatch(typeUpdateUserInfo(data));
//         dispatch(typeAuthUser());
//       } else {
//         dispatch(typeInitInfo(data));
//         dispatch(typeCompleteJoinUser());
//         dispatch(typeAuthUser());
//       }
//       // window.location.replace("/main");
//       // history.push({ pathname: '/main' });
//     } else {
//       alert('다음과 같은 기준을 맞춰 주십시오. \n 닉네임: 2자 이상, 6자 이하 \n 닉네임 중복 확인 \n 카테고리, 다짐 공개여부 선택')
//     }
//     // const data = {
//     //   "category": Number(category),
//     //   "isOpen": isOpen,
//     //   "kakaoIdNum": kakaoIdNum,
//     //   "name": name,
//     // };
//     // if (isAuth && !isJoin){
//     //   console.log(data)
//     //   dispatch(typeUpdateUserInfo(data));
//     // } else {
//     //   dispatch(typeInitInfo(data));
//     //   dispatch(typeCompleteJoinUser());
//     // }
//     // history.push({ pathname: '/main' });
//   };

//   const onDuplicateHandler = () => {
//     if (name === undefined || name.length < 2) {
//       alert('닉네임은 2자이상 6자 이하로 설정해 주십시오.')
//     } else {
//         // fetch(`http://localhost:8080/api/v1/users/checkname/${name}`, {
//         fetch(`http://i5a208.p.ssafy.io:8080/api/v1/users/checkname/${name}`, {
//             method: "GET",
//           })
//           .then(response => {if(response.status === 200){
//             setIsDupl(1)
//             alert("사용 가능한 닉네임 입니다.");
//           }else if(response.status === 401){
//             setIsDupl(0)
//             alert("이미 사용중인 닉네임입니다.")
//           }else{
//             setIsDupl(0)
//             alert("사용 불가한 닉네임입니다.")
//           }
//         })
//       }
//   };

//   const onWithdrawalHandler = () => {
//     dispatch(typeWithdrawal());
//     // dispatch(typeAuthUser());
//     // window.location.replace("/");
//     // history.push({ pathname: '/' });
//     // fetch(`http://localhost:8080/api/v1/users/${kakaoIdNum}`, {
//     // // fetch(`http://i5a208.p.ssafy.io:8080/api/v1/users/${kakaoIdNum}`, {
//     //     method: "DELETE",
//     //   })
//     //   .then(response => {if(response.status === 200){
//     //     console.log(response)
//     //     window.localStorage.removeItem('CURRENT_USER');
//     //     dispatch(typeAuthUser());
//     //     history.push({ pathname: '/' });
//     //   }else if(response.status === 401){
//     //     alert("인증이 실패하였습니다.")
//     //   }else{
//     //     alert("존재하는 사용자가 없습니다.")
//     //   }
//     // })
//   };



//   return (
//     <MemberSetting
//       // 상태와
//       kakaoIdNum={kakaoIdNum}
//       isJoin={isJoin}
//       isAuth={isAuth}
//       name={name}
//       setname={setname}
//       category={category}
//       setCategory={setCategory}
//       isOpen={isOpen}
//       setisOpen={setisOpen}
//       onDuplicateHandler={onDuplicateHandler}
//       onUpdateInfo={onUpdateInfo}
//       onWithdrawalHandler={onWithdrawalHandler}
//     />
//   );
// }

// export default MemberSettingContainer;


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MemberSetting from '../components/Entrance/MemberSetting';
import {
  typeGetUserInfo,
  typeInitInfo,
  typeUpdateUserInfo,
  typeInitialize,
} from '../modules/memberSetting';
import {
  typeAuthUser,
  typeSettingInitialize,
  typeCompleteJoinUser,
  typeWithdrawal,
} from '../modules/userAuthorization';

import { useHistory } from 'react-router';

function MemberSettingContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  // useSelector는 리덕스 스토어의 상태를 조회.
  // useSelector를 통해 rootReducer에 있는 타 모듈을 불러옴.
  let { kakaoIdNum, isJoin, isAuth, info, update,setting  } = useSelector(({authorization, memberSetting }) => ({
    kakaoIdNum: authorization.kakaoIdNum,
    isJoin: authorization.isJoin,
    isAuth: authorization.isAuth,
    setting: authorization.setting,
    info: memberSetting.info,
    update: memberSetting.update,
  }));

  const [name, setname] = useState('');
  const [category, setCategory] = useState('');
  const [isOpen, setisOpen] = useState('');
  const [isDupl, setIsDupl] = useState('');
  // const originName = info.name;

  let a = false;


  useEffect(() => {
    dispatch(typeGetUserInfo());
    // dispatch(typeAuthUser());
  }, []);

  useEffect(() => {
    setname(info.name);
    setCategory(info.category);
    setisOpen(info.isOpen);
    // history.push({ pathname: '/main' });
  }, [info]);


  const onUpdateInfo = () => {
    if(name != undefined && 2 <= name.length && name.length <= 6 && category != undefined && isOpen != undefined && isDupl === 1){
      if (isAuth && !isJoin){
        const data = {
          "category": Number(category),
          "isOpen": isOpen,
          "name": name,
        };
        dispatch(typeUpdateUserInfo(data));
      } else {
        
          const data = {
            "category": Number(category),
            "isOpen": isOpen,
            "kakaoIdNum": window.localStorage.getItem('CURRENT_USER'),
            "name": name,
          };
        dispatch(typeInitInfo(data));
      }
    } else {
      alert('다음과 같은 기준을 맞춰 주십시오. \n 닉네임: 2자 이상, 6자 이하 \n 닉네임 중복 확인 \n 카테고리, 다짐 공개여부 선택')
    }
  };

  useEffect(() => {
    if (update?.message) {
      console.log('hi')
      dispatch(typeAuthUser());
      dispatch(typeInitialize());
      a = true;
    }
  }, [update]);

  useEffect(() => {
    if (a === true) {
      console.log('변화')
     history.push({ pathname: '/main' });
     a = false;
    }
  }, [a]);

  const onDuplicateHandler = () => {
    if (name === undefined || name.length < 2 || name.length > 6) {
      alert('닉네임은 2자이상 6자 이하로 설정해 주십시오.')
    } else {
        // fetch(`http://localhost:8080/api/v1/users/checkname/${name}`, {
        fetch(`http://i5a208.p.ssafy.io:8080/api/v1/users/checkname/${name}`, {
            method: "GET",
          })
          .then(response => {if(response.status === 200){
            setIsDupl(1)
            alert("사용 가능한 닉네임 입니다.");
          }else if(response.status === 401){
            setIsDupl(0)
            alert("이미 사용중인 닉네임입니다.")
          }else{
            setIsDupl(0)
            alert("사용 불가한 닉네임입니다.")
          }
        })
      }
  };

  const onWithdrawalHandler = () => {
    dispatch(typeWithdrawal());
  };

  useEffect(() => {
    if (!isJoin && !isAuth) {      
      history.push({ pathname: '/' });
    }
  }, [isJoin, isAuth]);



  return (
    <MemberSetting
      // 상태와
      kakaoIdNum={kakaoIdNum}
      isJoin={isJoin}
      isAuth={isAuth}
      name={name}
      setname={setname}
      category={category}
      setCategory={setCategory}
      isOpen={isOpen}
      setisOpen={setisOpen}
      onDuplicateHandler={onDuplicateHandler}
      onUpdateInfo={onUpdateInfo}
      onWithdrawalHandler={onWithdrawalHandler}
    />
  );
}

export default MemberSettingContainer;