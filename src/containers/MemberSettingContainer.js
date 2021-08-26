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
  typeWithdrawal,
  typeInitState,
} from '../modules/userAuthorization';

import { useHistory } from 'react-router';
import Swal from 'sweetalert2';


const SERVER_URL = process.env.REACT_APP_SERVER_URL


function MemberSettingContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  // useSelector는 리덕스 스토어의 상태를 조회.
  // useSelector를 통해 rootReducer에 있는 타 모듈을 불러옴.
  let { isJoin, isAuth, info, update, withdrawalSuccess } = useSelector(({authorization, memberSetting }) => ({
    isJoin: authorization.isJoin,                         // 현재 가입해야 하는 회원인지 판단하는 boolean
    isAuth: authorization.isAuth,                         // 현재 kakaoid를 받은 유저인지 판단하는 boolean 아예 로그인 시도조차 하지 않았으면 false
    info: memberSetting.info,                             // 회원 정보 수정이나, 가입을 했을 때 새로운 회원 정보를 받는 state
    update: memberSetting.update,                         // 회원 정보 수정이나 가입이 정상적으로 되었을 때 success messag를 받으면 useEffect로 보내 줘서 모달을 띄움.
    withdrawalSuccess: authorization.withdrawalSuccess,   // 정상적으로 탈퇴가 되었을 때 useEffect를 보내줄 state
  }));

  const [name, setname] = useState('');                   // <이름 값 저장 변수>, <이름 값 갱신 함수>
  const [category, setCategory] = useState('');
  const [isOpen, setisOpen] = useState('');               // 다짐 공개 값 저장 변수, 다짐 공개 값 갱신 함수
  const [isDupl, setIsDupl] = useState('');               // 중복 닉네임을 가진 값인지 저장하는 변수, 갱신 함수

  useEffect(() => {                                       // 초기에 user의 정보를 받아온다. 새로 가입하는 유저는 공백 값을 받아옴.
    dispatch(typeGetUserInfo());
  }, []);

  useEffect(() => {
    if (isJoin && isAuth){              // 카카오 로그인을 마친 후, 가입해야 하는 회원이라면
      setname('');                      // 일단 닉네임 값 공백
      setisOpen(true);                  // 다짐, 일기 공개 여부는 default로 true
    } else if (!isJoin && isAuth) {     // 만약 이미 회원가입된 유저라면 기존의 정보대로 초기화
      setname(info.name);
      setisOpen(info.isOpen);
    }
    setCategory(info.category);

    //* 회원 탈퇴 시.
    if (!isJoin && !isAuth) {           // 회원 탈퇴할 때에는 모든 값이 false로 바뀌고 초기 화면 페이지로 돌아가야함.
      history.push({ pathname: '/' });
    }
  }, [info, isJoin, isAuth]);

  useEffect(() => {           // 기존 가입된 유저의 저장된 닉과, 현재 수정페이지의 닉과 같다면
    if (name == info.name){   // 중복값은 false
      setIsDupl(0);
    } else {                  // 그게 아니라면 중복 확인 버튼을 눌러야 한다는 의미로 1로 상태 변화.
      setIsDupl(1);
    }
  }, [name]);
  
  useEffect(() => {           // 회원 정보 update를 눌렀을 때 success message가 들어오면
    if (update?.message) {    // 다시 유저 정보를 받아오고, update 상태 값 초기화.
      dispatch(typeAuthUser());
      dispatch(typeInitialize());
    }
  }, [update]);

  useEffect(() => {
		if (!isAuth){                                                     // 인증되지 않은 사용자는 두 가지 유형이 있음.
      if (withdrawalSuccess?.message){                                // 방금 탈퇴한 사람.
        Swal.fire({
          title: '<span style="color: white">탈퇴하셨습니다. <span>',
          icon: 'success',
          background: '#292A33',
        }).then((result) => {
        });
        dispatch(typeInitState());
      } else {                                                         // 아예 로그인도 하지 않은 채 url로만 접속하려는 사람.
        Swal.fire({
          title: '<span style="color: white">잘못된 접근입니다. <span>',
          icon: 'error',
          background: '#292A33',
          confirmButtonColor: '#E96F02',
          confirmButtonText: 'OK!',
        }).then((result) => {
        });
      }
			history.push({ pathname: '/' });                                  // 모두 초기화면 페이지로 돌려줌.
		};
  }, [isAuth, withdrawalSuccess]);

  const onUpdateInfo = () => {
    const validation = /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;                 // 닉 유효성 검사. 숫자 영어 대소문자, 한글만 가능하다.
    if(name != undefined && 2 <= name.length && name.length <= 6 && validation.test(name) && category != undefined && isOpen != undefined && isDupl === 0){
      //* 기존 존재하는 회원일 경우,
      if (isAuth && !isJoin){                                             // 조건을 충족하는 기존회원이라면 저장되었다는 모달을
        const data = {
          "category": Number(category),
          "isOpen": isOpen,
          "name": name,
        };
        dispatch(typeUpdateUserInfo(data));
        Swal.fire({
          title: '<span style="color: white">저장되었습니다. <span>',
          icon: 'success',
          background: '#292A33',
          confirmButtonColor: '#E96F02',
          confirmButtonText: '방으로 이동',
          showCancelButton: true,
          cancelButtonText: '취소',
        }).then((result) => {                                             /// 방으로 이동 버튼을 누르면, main으로 push
          if (result.isConfirmed) {
            history.push({ pathname: '/main' });
          };
        });
      } else {
        //* 새로 가입하는 회원일 경우, 가입되었다는 모달을.
          const data = {
            "category": Number(category),
            "isOpen": isOpen,
            "kakaoIdNum": window.localStorage.getItem('CURRENT_USER'),
            "name": name,
          };
        dispatch(typeInitInfo(data));
        Swal.fire({
          title: '<span style="color: white">가입되었습니다. <span>',
          icon: 'success',
          background: '#292A33',
          confirmButtonColor: '#E96F02',
          confirmButtonText: '방으로 이동',
          showCancelButton: true,
          cancelButtonText: '취소',
        }).then((result) => {
          if (result.isConfirmed) {
            history.push({ pathname: '/main' });
          };
        });
      };
    } else {                                              // 유효성 검사에 어긋난다면 다음과 같은 모달 출력.
      Swal.fire({
        title: '<span style="color: white">기준을 맞춰 주십시오. <span>',
        html:'<span style="color: white"> 닉네임은 2자 이상, 6자 이하, 숫자, 알파벳, 한글만 가능 <br> \
        닉네임 중복 확인 <br>\
        카테고리, 다짐 공개여부 선택 <span>',
        icon: 'error',
        background: '#292A33',
        confirmButtonColor: '#E96F02',
        confirmButtonText: 'OK!',
        className: "alertCustom",
      }).then((result) => {
      });
    };
  };

  const onDuplicateHandler = () => {              // 닉네임 중복확인하는 핸들러
    const validation = /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;
    if(name === info.name && name != undefined && name != ''){

      setIsDupl(0);
      Swal.fire({
        title: '<span style="color: white">사용 가능한 닉네임입니다. <span>',
        icon: 'success',
        background: '#292A33',
        confirmButtonColor: '#E96F02',
        confirmButtonText: 'OK!',
      }).then((result) => {
      });

    } else {

        if (name == undefined || name == ' ' || name.length < 2 || name.length > 6 || !validation.test(name)) {
          // alert('닉네임은 2자이상 6자 이하의 숫자, 한글, 알파벳으로만 설정해 주십시오.')
          Swal.fire({
            title: '<span style="color: white">기준을 맞춰 주십시오. <span>',
            html:'<span style="color: white"> 닉네임은 2자 이상, 6자 이하, 숫자, 알파벳, 한글만 가능<span>',
            icon: 'error',
            background: '#292A33',
            confirmButtonColor: '#E96F02',
            confirmButtonText: 'OK!',
            className: "alertCustom",
          }).then((result) => {
          });
        } else {
          fetch(`${SERVER_URL}users/checkname/${name}`, {
              method: "GET",
            })
            .then(response => {if(response.status === 200){
              setIsDupl(0)
              Swal.fire({
                title: '<span style="color: white">사용 가능한 닉네임입니다. <span>',
                icon: 'success',
                background: '#292A33',
                confirmButtonColor: '#E96F02',
                confirmButtonText: 'OK!',
              }).then((result) => {
              });
            }else if(response.status === 401){
              setIsDupl(1)
              Swal.fire({
                title: '<span style="color: white">이미 사용 중인 닉네임입니다. <span>',
                icon: 'error',
                background: '#292A33',
                confirmButtonColor: '#E96F02',
                confirmButtonText: 'OK!',
              }).then((result) => {
              });
            }else{
              setIsDupl(1);
              alert("사용 불가한 닉네임입니다.");
            }
          })
        }
    }
  };

  const onWithdrawalHandler = () => {   // 회원 탈퇴 핸들러
    dispatch(typeWithdrawal());
  };


  return (
    <MemberSetting
      // 상태와
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