import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MemberSetting from '../components/Entrance/MemberSetting';
import {
  typeGetUserInfo,
  typeInitInfo,
} from '../modules/memberSetting';

function MemberSettingContainer() {
  const dispatch = useDispatch();
  // useSelector는 리덕스 스토어의 상태를 조회.
  // useSelector를 통해 rootReducer에 있는 타 모듈을 불러옴.
  const { kakaoIdNum, isJoin, isAuth, info } = useSelector(({authorization, memberSetting }) => ({
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
    dispatch(typeInitInfo(data));
  };

  const onDuplicateHandler = () => {
    fetch(`http://localhost:8080/api/v1/users/checkname/${nickname}`, {
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
    />
  );
}

export default MemberSettingContainer;