import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MemberSetting from '../components/Entrance/MemberSetting';
import {
  typeGetUserInfo,
  typeInitInfo,
  typeUpdateUserInfo,
  typeWithdrawal,
} from '../modules/memberSetting';
import {
  typeAuthUser,
  typeCompleteJoinUser
} from '../modules/userAuthorization';

import { useHistory } from 'react-router';

function MemberSettingContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  // useSelector는 리덕스 스토어의 상태를 조회.
  // useSelector를 통해 rootReducer에 있는 타 모듈을 불러옴.
  let { kakaoIdNum, isJoin, isAuth, info } = useSelector(({authorization, memberSetting }) => ({
    kakaoIdNum: authorization.kakaoIdNum,
    isJoin: authorization.isJoin,
    isAuth: authorization.isAuth,
    info: memberSetting.info,
  }));

  const [nickname, setNickname] = useState('');
  const [category, setCategory] = useState('');
  const [isPublic, setIsPublic] = useState('');

  useEffect(() => {
    dispatch(typeGetUserInfo());
  }, []);

  useEffect(() => {
    setNickname(info.nickname);
    setCategory(info.category);
    setIsPublic(info.isPublic);
  }, [info]);

  const onUpdateInfo = () => {
    const data = {
      "category": Number(category),
      "isOpen": isPublic,
      "kakaoIdNum": kakaoIdNum,
      "name": nickname,
    };
    if (isAuth && !isJoin){
      console.log(data)
      dispatch(typeUpdateUserInfo(data));
    } else {
      dispatch(typeInitInfo(data));
      dispatch(typeCompleteJoinUser());
    }
    history.push({ pathname: '/main' });
  };

  const onDuplicateHandler = () => {
    // fetch(`http://localhost:8080/api/v1/users/checkname/${nickname}`, {
    fetch(`http://i5a208.p.ssafy.io:8080/api/v1/users/checkname/${nickname}`, {
        method: "GET",
      })
      .then(response => {if(response.status === 200){
        alert("사용 가능한 닉네임 입니다.");
      }else if(response.status === 401){
        alert("이미 사용중인 아이디 입니다.")
      }else{
        alert("사용 불가한 아이디입니다.")
      }
    })
  };

  const onWithdrawalHandler = () => {
    console.log(kakaoIdNum)
    // fetch(`http://localhost:8080/api/v1/users/${kakaoIdNum}`, {
    fetch(`http://i5a208.p.ssafy.io:8080/api/v1/users/${kakaoIdNum}`, {
        method: "DELETE",
      })
      .then(response => {if(response.status === 200){
        console.log(response)
        localStorage.removeItem('CURRENT_USER');
        dispatch(typeAuthUser());
        history.push({ pathname: '/' });
      }else if(response.status === 401){
        alert("인증이 실패하였습니다.")
      }else{
        alert("존재하는 사용자가 없습니다.")
      }
    })
  };



  return (
    <MemberSetting
      // 상태와
      kakaoIdNum={kakaoIdNum}
      isJoin={isJoin}
      isAuth={isAuth}
      nickname={nickname}
      setNickname={setNickname}
      category={category}
      setCategory={setCategory}
      isPublic={isPublic}
      setIsPublic={setIsPublic}
      onDuplicateHandler={onDuplicateHandler}
      onUpdateInfo={onUpdateInfo}
      onWithdrawalHandler={onWithdrawalHandler}
    />
  );
}

export default MemberSettingContainer;