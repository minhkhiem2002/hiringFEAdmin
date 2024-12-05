export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const CHECK_PASSWORD_REQUEST = 'CHECK_PASSWORD_REQUEST'
export const CHECK_PASSWORD_SUCCESS = 'CHECK_PASSWORD_SUCCESS'
export const CHECK_PASSWORD_FAILURE = 'CHECK_PASSWORD_FAILURE'

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'

export const LOG_OUT = 'LOG_OUT'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';

export const CHECK_USER_REQUEST = 'CHECK_USER_REQUEST'
export const CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS'
export const CHECK_USER_FAILURE = 'CHECK_USER_FAILURE'

export const UPDATE_AVATAR_REQUEST = 'UPDATE_AVATAR_REQUEST'
export const UPDATE_AVATAR_SUCCESS = 'UPDATE_AVATAR_SUCCESS'
export const UPDATE_AVATAR_FAILURE = 'UPDATE_AVATAR_FAILURE'

export const updateAvatarRequest = (data) => ({
    type: UPDATE_AVATAR_REQUEST,
    payload: data
  });
  
  export const updateAvatarSuccess = (response) => ({
    type: UPDATE_AVATAR_SUCCESS,
    payload: response,
  });
  
  export const updateAvatarFailure = (error) => ({
    type: UPDATE_AVATAR_FAILURE,
    payload: error,
  });

export const loginRequest = (username, password) => ({
    type: LOGIN_REQUEST,
    payload: { username, password}
})

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
})

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
})

export const checkPasswordRequest = (password) => ({
    type: CHECK_PASSWORD_REQUEST,
    payload: { password }
})

export const checkPasswordSuccess = (data) => ({
    type: CHECK_PASSWORD_SUCCESS,
    payload: data
})

export const checkPasswordFailure = (error) => ({
    type: CHECK_PASSWORD_FAILURE,
    payload: error 
})

export const changePasswordRequest = (password, newPassword) => ({
    type: CHANGE_PASSWORD_REQUEST,
    payload: {password, newPassword}
})

export const changePasswordSuccess = (data) => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload: data
})

export const changePasswordFailure = (error) => ({
    type: CHANGE_PASSWORD_FAILURE,
    payload: error
})

export const logout = () => ({
    type: LOG_OUT
})

export const logoutSuccess = () => ({
    type: LOG_OUT_SUCCESS
});

export const checkUserRequest = (id) => ({
    type: CHECK_USER_REQUEST,
    payload: { id }
})

export const checkUserSuccess = (data) => ({
    type: CHECK_USER_SUCCESS,
    payload: data
})

export const checkUserFailure = (error) => ({
    type: CHECK_USER_FAILURE,
    payload: error
})