import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import DirectorSetting from '../components/Entrance/DirectorSetting';
import {typeAuthUser} from '../modules/userAuthorization';
import {
	typeGetUserInfo, 
	typePostUserCode, 
	typeInitUpdateInfo, 
	typeGetCommonCode, 
	typeDeleteCommonCode,
	typeUpdateteCommonCode,
	// typePatchCommonCode,
	typeGetDetailCode,
	typeDeleteDetailCode,
	typeUpdateteDetailCode,
} from '../modules/directorSetting';

// import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const DirectorSettingContainer = () => {
	
	const history = useHistory();
  const dispatch = useDispatch();

	let { 
		users, 
		updateSuccess, 
		commonCode, 
		deleteCommonCodeSuccess,
		updateCommonCodeSuccess,
		patchCommonCodeSuccess,
		detailCode,
		deleteDetailCodeSuccess,
		updateDetailCodeSuccess,
		error,
		user_error,
		updateDetailError,
		isAdmin,
		 } = useSelector(({ directorSetting, authorization }) => ({
		users: directorSetting.users,
		updateSuccess: directorSetting.updateSuccess,
		commonCode: directorSetting.commonCode,
		deleteCommonCodeSuccess: directorSetting.deleteCommonCodeSuccess,
		updateCommonCodeSuccess: directorSetting.updateCommonCodeSuccess,
		patchCommonCodeSuccess: directorSetting.patchCommonCodeSuccess,
		detailCode: directorSetting.detailCode,
		deleteDetailCodeSuccess: directorSetting.deleteDetailCodeSuccess,
		updateDetailCodeSuccess: directorSetting.updateDetailCodeSuccess,
		error: directorSetting.error,
		user_error: directorSetting.user_error,
		updateDetailError: directorSetting.updateDetailError,
    isAdmin: authorization.isAdmin,
  }));
	
  const [name, setName] = useState('');
  const [usercode, setUsercode] = useState('');
  const [id, setId] = useState('');
  const [updatecode, setUpdatecode] = useState('');
  const [commonType, setCommonType] = useState('');
  const [updatecodeFlag, setUpdatecodeFlag] = useState('');

	const alphaToNum = {
		'일반 회원': 1,
		관리자: 2,
		'제재 회원': 3,
	};

	useEffect(() => {
		dispatch(typeGetCommonCode());
		dispatch(typeGetDetailCode());
		dispatch(typeInitUpdateInfo());
		dispatch(typeAuthUser());
  }, []);

	useEffect(() => {
		if (!isAdmin){
			Swal.fire({
				title: '<span style="color: white">잘못된 접근입니다. <span>',
				icon: 'error',
				background: '#292A33',
				// confirmButtonColor: '#E96F02',
				// confirmButtonText: 'OK!',
			}).then((result) => {
			});
			history.push({ pathname: '/' });
		};
  }, [isAdmin]);

	useEffect(() => {
		if (users?.name && users?.usercode){
			setName(users.name);
			setUsercode(users.usercode);
		}
  }, [users]);

	useEffect(() => {
		if (user_error){
			Swal.fire({
				title: '<span style="color: white">없는 사용자입니다. <span>',
				icon: 'error',
				background: '#292A33',
				confirmButtonColor: '#E96F02',
				confirmButtonText: 'OK!',
			}).then((result) => {
			});
			dispatch(typeInitUpdateInfo());
		}
  }, [user_error]);

	useEffect(() => {
		if (updateSuccess?.message){
			dispatch(typeInitUpdateInfo())
			dispatch(typeGetUserInfo(users.name))
			Swal.fire({
				title: '<span style="color: white">변경되었습니다. <span>',
				icon: 'success',
				background: '#292A33',
				confirmButtonColor: '#E96F02',
				confirmButtonText: 'OK!',
			}).then((result) => {
			})
		}
  }, [updateSuccess]);

	useEffect(() => {
		if (deleteCommonCodeSuccess?.message){
			dispatch(typeGetCommonCode());
			dispatch(typeGetDetailCode());
			dispatch(typeInitUpdateInfo())
		}
  }, [deleteCommonCodeSuccess]);

	useEffect(() => {
		if (updateCommonCodeSuccess?.message){
			dispatch(typeGetCommonCode());
			dispatch(typeInitUpdateInfo());
			Swal.fire({
				title: '<span style="color: white">추가되었습니다. <span>',
				icon: 'success',
				background: '#292A33',
				confirmButtonColor: '#E96F02',
				confirmButtonText: 'OK!',
				customClass: {
					container: 'my-swal',
				},
			}).then((result) => {
			})
		}
  }, [updateCommonCodeSuccess]);

	useEffect(() => {
		if (patchCommonCodeSuccess?.message){
			dispatch(typeGetCommonCode());
			dispatch(typeInitUpdateInfo())
		}
  }, [patchCommonCodeSuccess]);
	
	useEffect(() => {
		if (deleteDetailCodeSuccess?.message){
			dispatch(typeGetDetailCode());
			dispatch(typeInitUpdateInfo());
		}
  }, [deleteDetailCodeSuccess]);

	useEffect(() => {
		if (updateDetailCodeSuccess?.message){
			dispatch(typeGetDetailCode());
			dispatch(typeInitUpdateInfo());
			Swal.fire({
				title: '<span style="color: white">추가되었습니다. <span>',
				icon: 'success',
				background: '#292A33',
				confirmButtonColor: '#E96F02',
				confirmButtonText: 'OK!',
				customClass: {
					container: 'my-swal',
				},
			}).then((result) => {
			})
		}
  }, [updateDetailCodeSuccess]);

	useEffect(() => {
		if (updateDetailError){
			Swal.fire({
				title: '<span style="color: white">존재하지 않는 공통코드입니다. <span>',
				icon: 'error',
				background: '#292A33',
				confirmButtonColor: '#E96F02',
				confirmButtonText: 'OK!',
				customClass: {
					container: 'my-swal',
				},
			}).then((result) => {
			});
			dispatch(typeInitUpdateInfo());
		}
  }, [updateDetailError]);

	const onSearchUser = (e) => {
		if (e.which == 13){
			dispatch(typeGetUserInfo(e.target.value));
		}
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
  const patchCommonCode = (e) => {
		setId(e.currentTarget.value)
		// const data = {
		// 	'id': id,
		// 	'kind': updatecode,
		// };
		// dispatch(typePatchCommonCode(data));
		// alert('준비 중입니다.')
  };

  const deleteCommonCode = (e) => {
		dispatch(typeDeleteCommonCode(e.currentTarget.value));
  };

  const updateCommonCode = () => {
		if (updatecodeFlag === 1){
			dispatch(typeUpdateteCommonCode(updatecode));
		} else {
			const data = {
				'name': updatecode,
				'type': commonType,
			};
			dispatch(typeUpdateteDetailCode(data));
			setCommonType('');
		}
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
      patchCommonCode={patchCommonCode}
			deleteCommonCode={deleteCommonCode}
			updatecode={updatecode}
			setUpdatecode={setUpdatecode}
			updateCommonCode={updateCommonCode}
			detailCodes={detailCodes}
			deleteDetailCode={deleteDetailCode}
			updatecodeFlag={updatecodeFlag}
			setUpdatecodeFlag={setUpdatecodeFlag}
			commonType={commonType}
			setCommonType={setCommonType}
			/>
		</div>
	)
}

export default DirectorSettingContainer
