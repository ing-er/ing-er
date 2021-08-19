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
  let { kakaoIdNum, isJoin, isAuth, info, update, withdrawalSuccess } = useSelector(({authorization, memberSetting }) => ({
    kakaoIdNum: authorization.kakaoIdNum,
    isJoin: authorization.isJoin,
    isAuth: authorization.isAuth,
    setting: authorization.setting,
    info: memberSetting.info,
    update: memberSetting.update,
    withdrawalSuccess: authorization.withdrawalSuccess,
  }));

  const [name, setname] = useState('');
  const [category, setCategory] = useState('');
  const [isOpen, setisOpen] = useState('');
  const [isDupl, setIsDupl] = useState('');

  useEffect(() => {
    dispatch(typeGetUserInfo());
  }, []);


  useEffect(() => {
		if (!isAuth){
      if (withdrawalSuccess?.message){
        Swal.fire({
          title: '<span style="color: white">탈퇴하셨습니다. <span>',
          icon: 'success',
          background: '#292A33',
        }).then((result) => {
        });
        dispatch(typeInitState());
      } else {
        Swal.fire({
          title: '<span style="color: white">잘못된 접근입니다. <span>',
          icon: 'error',
          background: '#292A33',
          confirmButtonColor: '#E96F02',
          confirmButtonText: 'OK!',
        }).then((result) => {
        });
      }
			history.push({ pathname: '/' });
		};
  }, [isAuth, withdrawalSuccess]);

  useEffect(() => {
    if (name == info.name){
      setIsDupl(1);
    } else {
      setIsDupl(0);
    }
  }, [name]);

  useEffect(() => {
    if (isJoin && isAuth){
      setname('');
      setisOpen(true);
    } else if (!isJoin && isAuth) {
      setname(info.name);
      setisOpen(info.isOpen);
    }
    setCategory(info.category);

    //* 회원 탈퇴 시.
    if (!isJoin && !isAuth) {
      history.push({ pathname: '/' });
    }
  }, [info, isJoin, isAuth]);
  
  useEffect(() => {
    if (update?.message) {
      dispatch(typeAuthUser());
      dispatch(typeInitialize());
    }
  }, [update]);

  const onUpdateInfo = () => {
    const validation = /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;
    if(name != undefined && 2 <= name.length && name.length <= 6 && validation.test(name) && category != undefined && isOpen != undefined && isDupl === 1){
      //* 기존 존재하는 회원일 경우,
      if (isAuth && !isJoin){
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
        }).then((result) => {
          if (result.isConfirmed) {
            history.push({ pathname: '/main' });
          };
        });
      } else {
        //* 새로 가입하는 회원일 경우,
          const data = {
            "category": Number(category),
            "isOpen": isOpen,
            "kakaoIdNum": window.localStorage.getItem('CURRENT_USER'),
            "name": name,
          };
        dispatch(typeInitInfo(data));
        // alert('저장되었습니다.');
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
    } else {
      Swal.fire({
        title: '<span style="color: white">기준을 맞춰 주십시오. <span>',
        // text: '닉네임은 2자 이상, 6자 이하, 숫자, 알파벳, 한글만 가능 \n 닉네임 중복 확인 \n 카테고리, 다짐 공개여부 선택',
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

  const onDuplicateHandler = () => {
    const validation = /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;
    if(name === info.name && name != undefined && name != ''){

      setIsDupl(1);
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
              setIsDupl(1)
              Swal.fire({
                title: '<span style="color: white">사용 가능한 닉네임입니다. <span>',
                icon: 'success',
                background: '#292A33',
                confirmButtonColor: '#E96F02',
                confirmButtonText: 'OK!',
              }).then((result) => {
              });
            }else if(response.status === 401){
              setIsDupl(0)
              Swal.fire({
                title: '<span style="color: white">이미 사용 중인 닉네임입니다. <span>',
                icon: 'error',
                background: '#292A33',
                confirmButtonColor: '#E96F02',
                confirmButtonText: 'OK!',
              }).then((result) => {
              });
            }else{
              setIsDupl(0);
              alert("사용 불가한 닉네임입니다.");
            }
          })
        }
    }
  };

  const onWithdrawalHandler = () => {
    dispatch(typeWithdrawal());
  };


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