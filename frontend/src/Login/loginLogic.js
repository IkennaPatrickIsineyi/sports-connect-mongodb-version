
export const signIn = (event, state, updateState, dispatch,
    loadUserData, loginComplete, remoteRequest, navigate, openSnackbar, toggleBlockView) => {

    console.log(state);
    event.preventDefault();

    const userId = state.userId;
    const password = state.password;

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }));
    }

    if (userId && password) {
        const body = JSON.stringify({
            userId: userId, password: password
        });

        const payload = {
            method: 'post', credentials: 'include', body: body, headers: {
                'Content-Type': 'application/json'
            }
        };

        const callback = (body) => {
            if (body?.result) {
                const userData = body.userData;

                localStorage.setItem('user', JSON.stringify({
                    username: userData?.username, emailVerified: userData?.emailVerified
                }));

                dispatch(loadUserData({
                    username: userData?.username, emailVerified: userData?.emailVerified
                }));

                navigate('/', { replace: true });

                console.log('Login success', 'success', body.result);
            }
            else if (body?.error === 'already-logged-in') {
                showSnackBar('Already logged in', 'info');
                navigate('/', { replace: true });
            }
            else if (body?.error === 'generic') {
                showSnackBar(body?.errMsg, 'error');
            }
        }
        remoteRequest('login', payload, showSnackBar, callback, updateState, toggleBlockView, dispatch);
    }
    else {
        showSnackBar('email and password are required', 'error');
    }
};



export const gotoSignUpPage = (event, state, navigate) => {
    event.preventDefault();
    navigate('/register');
};

export const gotoResetPasswordPage = (event, state, navigate) => {
    event.preventDefault();
    navigate('/reset-password');
};