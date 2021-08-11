import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import DirectorSetting from '../components/Entrance/DirectorSetting';
import {
	typeGetUserInfo, 
	typePostUserCode, 
	typeInitUpdateInfo, 
	typeGetCommonCode, 
	typeDeleteCommonCode,
	typeUpdateteCommonCode,
	typeGetDetailCode,
	typeDeleteDetailCode,
} from '../modules/directorSetting';

const DirectorSettingContainer = () => {
  const dispatch = useDispatch();

	let { 
		users, 
		updateSuccess, 
		commonCode, 
		deleteCommonCodeSuccess,
		updateCommonCodeSuccess,
		detailCode,
		deleteDetailCodeSuccess,
		 } = useSelector(({ directorSetting }) => ({
		users: directorSetting.users,
		updateSuccess: directorSetting.updateSuccess,
		commonCode: directorSetting.commonCode,
		deleteCommonCodeSuccess: directorSetting.deleteCommonCodeSuccess,
		updateCommonCodeSuccess: directorSetting.updateCommonCodeSuccess,
		detailCode: directorSetting.detailCode,
		deleteDetailCodeSuccess: directorSetting.deleteDetailCodeSuccess,
		// updateCommonCodeSuccess: directorSetting.updateCommonCodeSuccess,
  }));
	
  const [name, setName] = useState('');
  const [usercode, setUsercode] = useState('');
  const [updatecode, setUpdatecode] = useState('');

	const alphaToNum = {
		'일반 회원': 101,
		관리자: 102,
		'제재 회원': 103,
	};

	useEffect(() => {
		dispatch(typeGetCommonCode());
		dispatch(typeGetDetailCode());
  }, []);

	useEffect(() => {
		if (users?.name && users?.usercode){
			setName(users.name);
			setUsercode(users.usercode);
		}
  }, [users]);

	useEffect(() => {
		if (updateSuccess?.message){
			dispatch(typeInitUpdateInfo())
			dispatch(typeGetUserInfo(users.name))
			alert('변경되었습니다.')
		}
  }, [updateSuccess]);

	useEffect(() => {
		if (deleteCommonCodeSuccess?.message){
			dispatch(typeGetCommonCode());
		}
  }, [deleteCommonCodeSuccess]);

	useEffect(() => {
		if (updateCommonCodeSuccess?.message){
			dispatch(typeGetCommonCode());
		}
  }, [updateCommonCodeSuccess]);
	
	useEffect(() => {
		if (deleteDetailCodeSuccess?.message){
			dispatch(typeGetDetailCode());
		}
  }, [deleteDetailCodeSuccess]);

	// useEffect(() => {
	// 	if (updateCommonCodeSuccess?.message){
	// 		dispatch(typeGetDetailCode());
	// 	}
  // }, [updateCommonCodeSuccess]);

	const onSearchUser = (e) => {
		// if (e.keyCode == 0){
			dispatch(typeGetUserInfo(e.target.value));
		// }
	};

	const handleCode = (e) => {
		setUsercode(alphaToNum[e.target.value])
	};

	const updateUsercode = () => {
		const data = {
			'id': users.id,
			'usercode': usercode,
		};
		dispatch(typePostUserCode(data));
	};

	//* 공통 코드 관련 event
  const postCommonCode = (e) => {
		alert('준비 중입니다.');
  };

  const deleteCommonCode = (e) => {
		dispatch(typeDeleteCommonCode(e.currentTarget.value));
  };

  const updateCommonCode = () => {
		dispatch(typeUpdateteCommonCode(updatecode));
		setUpdatecode('')
  };

	//* 세부 코드 관련 event
  // const postCommonCode = (e) => {
	// 	alert('준비 중입니다.');
  // };

  const deleteDetailCode = (e) => {
		dispatch(typeDeleteDetailCode(e.currentTarget.value));
  };

  // const updateCommonCode = () => {
	// 	dispatch(typeUpdateteCommonCode(updatecode));
	// 	setUpdatecode('')
  // };


	//* 카테고리 렌더링
	function createData(id, kind) {
		return { id, kind, };
	};

	function createDetailCodeData(type, id, name) {
		return { type, id, name };
	};
	
	let commonCodes = [];
	let detailCodes = [];

	if (commonCode != undefined && detailCode != undefined){

		for (let i = 0; i < commonCode.length; i++){
			commonCodes.push(createData(commonCode[i]['id'], commonCode[i]['kind']));
		};
	
		for (let i = 0; i < detailCode.length; i++){
			detailCodes.push(createDetailCodeData(detailCode[i]['type'], detailCode[i]['id'], detailCode[i]['name']));
		};
	}
		


	return (
		<div>
			<DirectorSetting 
			onSearchUser={onSearchUser}
			name={users.name}
			originUsercode={users.usercode}
			usercode={usercode}
			setUsercode={setUsercode}
			handleCode={handleCode}
			updateUsercode={updateUsercode}
			commonCodes={commonCodes}
      postCommonCode={postCommonCode}
			deleteCommonCode={deleteCommonCode}
			updatecode={updatecode}
			setUpdatecode={setUpdatecode}
			updateCommonCode={updateCommonCode}
			detailCodes={detailCodes}
			deleteDetailCode={deleteDetailCode}
			/>
		</div>
	)
}

export default DirectorSettingContainer
