import { toast } from 'react-toastify';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService } from '../../services/userService';
import actionTypes from './actionTypes';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            });
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                console.log('check get state: ', getState);
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('check error: ', error);
        }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {

    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService('position');
            if (res && res.errCode === 0) {
                console.log('check get state: ', getState);
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailed error: ', error);
        }
    }

}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})


export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService('role');
            if (res && res.errCode === 0) {
                console.log('check get state: ', getState);
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed error: ', error);
        }
    }

}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Create new user succeed')
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            toast.error('Create new user failed')
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})
export const fetchAllUsersStart = () => {

    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }
            else {
                toast.error("fetch all users error!")
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            toast.error("fetch all users error!")
        }
    }

}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success(`Delete user succeed!`)
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                dispatch(saveUserFailed());
                toast.error("Delete user error")
            }
        } catch (error) {
            dispatch(saveUserFailed());
            toast.error("Delete user error")
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success(`Update user succeed!`)
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                dispatch(editUserFailed());
                toast.error("Edit user error")
            }
        } catch (error) {
            dispatch(editUserFailed());
            toast.error("Edit user error".error)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

// start -> doing -> end
