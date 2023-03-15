
export const sendOtp = (event, state, updateState, navigate, dispatch,
    openSnackbar, remoteRequest, toggleBlockView) => {
    console.log('sendOtp');
    const email = state.email;

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }))
    }

    event.preventDefault();
    if (email) {
        const payload = { method: 'get', credentials: 'include' };

        const callback = (body) => {
            if (body?.result) {
                navigate('/password-otp')
            }
            else {
                showSnackBar('Invalid', 'error');
            }
        }

        remoteRequest(`request-otp/?email=${email}&type=password`,
            payload, showSnackBar, callback, updateState, toggleBlockView, dispatch);
    }
    else {
        showSnackBar('email is required', 'error');
    }
} 