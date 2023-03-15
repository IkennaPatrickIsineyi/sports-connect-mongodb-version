
export const submitPassword = (event, state, updateState, navigate,
    dispatch, openSnackbar, remoteRequest, toggleBlockView) => {
    console.log('submitPassword');
    const password1 = state.password1;
    const password2 = state.password2;

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }))
    }

    event.preventDefault();
    if (password1 && password2 && (password1 === password2)) {
        const body = JSON.stringify({ password: password1 })
        const payload = {
            method: 'post', credentials: 'include', body: body, headers: {
                'Content-Type': 'application/json'
            }
        };

        const callback = (body) => {
            if (body?.result) {
                console.log('success');
                navigate('/login', { replace: true })
            }
            else if (body?.error === 'generic') {
                showSnackBar(body?.errMsg, 'error');
            }
            else {
                showSnackBar('Something went wrong... Try again later', 'error');
            }
        }

        remoteRequest('reset-password', payload, showSnackBar,
            callback, updateState, toggleBlockView, dispatch);
    }
    else {
        showSnackBar('OTP and password are required', 'error');
    }
} 