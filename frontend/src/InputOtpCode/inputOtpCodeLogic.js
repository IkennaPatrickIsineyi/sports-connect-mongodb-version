
export const verifyOtp = (event, state, updateState, navigate,
    remoteRequest, openSnackbar, dispatch, toggleBlockView) => {
    console.log('verifyOtp');
    const otp = state.otp;

    event.preventDefault();

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }))
    }

    if (otp) {

        const body = JSON.stringify({ otp: otp })
        const payload = {
            method: 'post', credentials: 'include', body: body, headers: {
                'Content-Type': 'application/json'
            }
        };

        const callback = (body) => {
            if (body?.result) {
                console.log('success');
                navigate('/new-password', { replace: true })
            }
            else {
                showSnackBar("Invalid OTP", 'error');
            }
        }

        remoteRequest('verify-otp', payload, showSnackBar,
            callback, updateState, toggleBlockView, dispatch);
    }
    else {
        console.log('otp is required');
        showSnackBar("otp is required", 'error');
    }
} 