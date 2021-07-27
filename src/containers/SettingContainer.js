import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MemberSetting from '../components/Entrance/MemberSetting';
import { setting, setDiffNickname, setDiffCategory } from '../modules/memberSetting';

function SettingContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { nickname, category, diffNickname, diffCategory } = useSelector(state => ({
    nickname: state.membersetting.nickname,
    diffNickname: state.membersetting.diffNickname,
    category: state.membersetting.category,
    diffCategory: state.membersetting.diffCategory,
  }));

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요
  const onSetting = () => dispatch(setting());
  const onSetDiffNickname = diffNickname => dispatch(setDiffNickname(diffNickname));
  const onSetDiffCategory = diffCategory => dispatch(setDiffCategory(diffCategory));

  return (
    <MemberSetting
      // 상태와
      nickname={nickname}
      category={category}
      diffNickname={diffNickname}
      diffCategory={diffCategory}
      // 액션을 디스패치 하는 함수들을 props로 넣어줍니다.
      onSetting={onSetting}
      onSetDiffNickname={onSetDiffNickname}
      onSetDiffCategory={onSetDiffCategory}
    />
  );
}

export default SettingContainer;