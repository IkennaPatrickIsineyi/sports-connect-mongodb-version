export const signUp = (event, state, dispatch, openSnackbar, navigate) => {
    console.log('sign up');
    const email = state.email.value;
    const password1 = state.password1.value;
    const password2 = state.password2.value;
    const username = state.username.value;
    const phone = state.phone.value;
    const interests = state.interests.value;

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message, severity }));
    }

    event.preventDefault();
    if (email && password1 && password2 && username && phone && interests.length
        && (password1 === password2)) {
        const body = {
            email: email, password: password1, username: username,
            phone: phone, interests: interests
        };

        navigate('/verification', { state: body });
    }
    else {
        showSnackBar('All values are required', 'error');
    }
}


export const validateInput = (state, updateState, remoteRequest, dispatch,
    openSnackbar, column, value) => {
    console.log('validate')

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }))
    }

    const payload = { method: "get", credentials: 'include' };
    const callback = (body) => {
        if (body?.result) {
            console.log('available');
        }
        else if (body?.error === 'not-available') {
            console.log('not-available');
            updateState({ [column]: { ...state[column], errMsg: body?.errMsg } })
        }
        else {
            showSnackBar('Validation failed', 'error');
        }
    }
    remoteRequest(`validate/?column=${column}&value=${value}`,
        payload, showSnackBar, callback, updateState, () => { }, () => { });
};
