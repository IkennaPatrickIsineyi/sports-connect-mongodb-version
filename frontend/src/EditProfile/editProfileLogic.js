

export const editProfile = (event, state, updateState, dispatch, type,
    remoteRequest, openSnackbar, navigate, logOutUser, toggleBlockView) => {
    console.log('editProfile');
    //const email = state.email;

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }))
    }

    event.preventDefault();
    if (!state.username.errMsg || !state.email.errMsg) {
        const body = JSON.stringify({
            username: state.inputUsername.value, email: state.inputEmail.value
        });

        const payload = {
            method: 'post', credentials: 'include', body: body, headers: {
                'Content-Type': 'application/json'
            }
        };

        const callback = (body) => {
            if (body?.result) {
                showSnackBar('Changes saved', 'success');
                //localStorage.removeItem('user');//delete user record from device
                //dispatch(logOutUser());//delete user record from redux store
                navigate('/', { replace: true });
            }
            else if (body?.error === 'not-logged-in') {
                dispatch(logOutUser());
                showSnackBar('You are not currently logged in', 'error');
                navigate('/login');
            }
            else {
                showSnackBar('Invalid', 'error');
            }
        }
        remoteRequest((type === 'email') ? 'update-email' : 'update-username',
            payload, showSnackBar, callback, updateState, toggleBlockView, dispatch);
    }
    else {
        showSnackBar('Attend to the errors', 'error');
    }

}


export const validateInput = (state, updateState, remoteRequest, dispatch,
    openSnackbar, column, value, ref, edit) => {
    console.log('validate')

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }))
    }

    const payload = { method: "get", credentials: 'include' };
    const callback = (body) => {
        if (body?.result) {
            console.log('available');
            edit();
        }
        else if (body?.error === 'not-available') {
            console.log('not-available');
            updateState({ [ref]: { ...state[ref], errMsg: body?.errMsg } })
        }
        else {
            showSnackBar('Validation failed', 'error');
        }
    }
    remoteRequest(`validate/?column=${column}&value=${value}`,
        payload, showSnackBar, callback, updateState, () => { }, () => { });
};
