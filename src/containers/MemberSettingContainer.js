import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MemberSetting from '../components/Entrance/MemberSetting';
import {
  typeGetUserInfo,
  typeInitInfo,
  typeCheckUserNickname,
} from '../modules/memberSetting';

function MemberSettingContainer() {
  const dispatch = useDispatch();
  // useSelector는 리덕스 스토어의 상태를 조회.
  // useSelector를 통해 rootReducer에 있는 타 모듈을 불러옴.
  const { kakaoIdNum, isDuplicated, info } = useSelector(({authorization, memberSetting }) => ({
    kakaoIdNum: authorization.kakaoIdNum,
    isDuplicated: memberSetting.isDuplicated,
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
    const data = nickname
    dispatch(typeCheckUserNickname(data))
    if (!isDuplicated){
      alert('사용 가능한 닉네임입니다.')
    } else {
      alert('이미 존재하는 닉네임입니다.')
    }
  };

  return (
    <MemberSetting
      // 상태와
      kakaoIdNum={kakaoIdNum}
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