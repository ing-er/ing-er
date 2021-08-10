import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import DirectorSetting from '../components/Entrance/DirectorSetting';
import {typeGetUserInfo, typePostUserCode, typeInitUpdateInfo} from '../modules/directorSetting';

const DirectorSettingContainer = () => {
  const dispatch = useDispatch();

	let { users, updateSuccess } = useSelector(({ directorSetting }) => ({
		users: directorSetting.users,
		updateSuccess: directorSetting.updateSuccess,
  }));
	
  const [name, setName] = useState('');
  const [usercode, setUsercode] = useState('');

	const alphaToNum = {
		'일반 회원': 101,
		관리자: 102,
		'제재 회원': 103,
	};

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

	const onSearchUser = (e) => {
		// if (e.keyCode == 0){
			dispatch(typeGetUserInfo(e.target.value));
		// }
	}

	const handleCode = (e) => {
		setUsercode(alphaToNum[e.target.value])
	}

	const updateUsercode = () => {
		const data = {
			'id': users.id,
			'usercode': usercode,
		}
		// console.log('data')
		// console.log(data)
		dispatch(typePostUserCode(data))
	}


	return (
		<div>
			<DirectorSetting 
			onSearchUser={onSearchUser}
			name={name}
			originUsercode={users.usercode}
			usercode={usercode}
			setUsercode={setUsercode}
			handleCode={handleCode}
			updateUsercode={updateUsercode}
			/>
		</div>
	)
}

export default DirectorSettingContainer
