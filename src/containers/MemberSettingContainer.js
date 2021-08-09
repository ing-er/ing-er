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
  let { kakaoIdNum, isJoin, isAuth, info, update } = useSelector(({authorization, memberSetting }) => ({
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
  let originName = info.name;

  let a = false;


  useEffect(() => {
    dispatch(typeGetUserInfo());
    // dispatch(typeAuthUser());
  }, []);

  useEffect(() => {
    setIsDupl(0);
  }, [name]);

  useEffect(() => {
    setname(info.name);
    setCategory(info.category);
    setisOpen(info.isOpen);
    // history.push({ pathname: '/main' });
  }, [info]);


  const onUpdateInfo = () => {
    const validation = /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;

    if(name != undefined && 2 <= name.length && name.length <= 6 && validation.test(name) && category != undefined && isOpen != undefined && isDupl === 1){
      if (isAuth && !isJoin){
        const data = {
          "category": Number(category),
          "isOpen": isOpen,
          "name": name,
        };
        dispatch(typeUpdateUserInfo(data));
        alert('저장되었습니다.')
      } else {
        
          const data = {
            "category": Number(category),
            "isOpen": isOpen,
            "kakaoIdNum": window.localStorage.getItem('CURRENT_USER'),
            "name": name,
          };
        dispatch(typeInitInfo(data));
        alert('저장되었습니다.')
      }
      originName = name
    } else {
      alert('다음과 같은 기준을 맞춰 주십시오. \n 닉네임은 2자 이상, 6자 이하, 숫자, 알파벳, 한글만 가능 \n 닉네임 중복 확인 \n 카테고리, 다짐 공개여부 선택')
    }
  };

  useEffect(() => {
    if (update?.message) {
      dispatch(typeAuthUser());
      dispatch(typeInitialize());
      a = true;
    }
  }, [update]);

  useEffect(() => {
    if (a === true) {
     history.push({ pathname: '/main' });
     a = false;
    }
  }, [a]);

  const onDuplicateHandler = () => {
    const validation = /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;
    if(name === originName){

      setIsDupl(1)
      alert('사용 가능한 닉네임입니다.')

    } else {

      if (name === undefined || name.length < 2 || name.length > 6 || !validation.test(name)) {
        alert('닉네임은 2자이상 6자 이하의 숫자, 한글, 알파벳으로만 설정해 주십시오.')
      } else {
          fetch(`http://localhost:8080/api/v1/users/checkname/${name}`, {
          // fetch(`http://i5a208.p.ssafy.io:8080/api/v1/users/checkname/${name}`, {
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