
export const sendOtp = (event, state, updateState, navigate,
    dispatch, openSnackbar, remoteRequest, toggleBlockView) => {

    console.log('sendOtp');
    const email = state.data.email;
    const phone = state.data.phone;

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }));
    }

    event.preventDefault();
    if (email) {
        const payload = { method: 'get', credentials: 'include' };

        const callback = (body) => {
            if (body?.result) {
                updateState({ otpSent: true });
            }
            else if (body?.error === 'invalid') {
                navigate('/register',
                    {
                        state: {
                            email: email,
                            phone: phone,
                            username: state.data.username,
                            password: state.data.password,
                            interests: state.data.interests
                        }
                    }
                );
                showSnackBar('Invalid phone number', 'error');
            }
            else if (body?.error === 'generic') {
                showSnackBar(body.errMsg, 'error');
            }
        }
        remoteRequest(`request-otp/?email=${email}&phone=${phone}&type=registration`,
            payload, showSnackBar, callback, updateState, toggleBlockView, dispatch);
    }
    else {
        showSnackBar('email and phone number are required', 'error');
    }
};

export const verifyOtp = (event, state, navigate, dispatch,
    openSnackbar, remoteRequest, updateState, toggleBlockView) => {

    console.log('verifyOtp');
    const otp = state.otp;

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }));
    }

    event.preventDefault();
    if (otp) {
        console.log('state.data ', state.data);
        const body = JSON.stringify({ otp: otp, data: state.data })
        const payload = {
            method: 'post', credentials: 'include', body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        //this is called when status 200 response is received fron server
        const callback = (body) => {
            if (body?.result) {
                console.log('success');
                navigate('/', { replace: true })
            }
            else if (body?.error === 'register') {
                console.log('registration failed');
                showSnackBar(body?.errMsg, 'error');
                navigate('/register');
            }
            else if (body?.error === 'invalid') {
                console.log('invalid');
                showSnackBar(body?.errMsg, 'error');
            }
            else {
                console.log('Unknown error occured');
                showSnackBar('Unknown error occured', 'error');
            }
        }
        remoteRequest('verify-phone', payload, showSnackBar,
            callback, updateState, toggleBlockView, dispatch);
    }
    else {
        console.log('otp cannot be empty')
    }
} 