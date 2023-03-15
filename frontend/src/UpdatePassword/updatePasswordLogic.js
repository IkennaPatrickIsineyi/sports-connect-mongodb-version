
export const submitPassword = (event, state, updateState, navigate,
    dispatch, openSnackbar, remoteRequest, toggleBlockView) => {
    console.log('submitPassword');
    const password1 = state.password1.value;
    const password2 = state.password2.value;

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }))
    }

    event.preventDefault();
    if (password1 && password2 && (password1 === password2)) {
        console.log(state.username);
        const body = JSON.stringify({ password: password1, username: state.username })
        const payload = {
            method: 'post', credentials: 'include', body: body, headers: {
                'Content-Type': 'application/json'
            }
        };

        const callback = (body) => {
            if (body?.result) {
                console.log('success');
                showSnackBar('Password Changed', 'info');
                navigate('/', { replace: true })
            }
            else if (body?.error === 'generic') {
                showSnackBar(body?.errMsg, 'error');
            }
            else {
                showSnackBar('Something went wrong... Try again later', 'error');
            }
        }

        remoteRequest('update-password', payload, showSnackBar,
            callback, updateState, toggleBlockView, dispatch);
    }
    else {
        showSnackBar('Password are required', 'error');
    }
} 