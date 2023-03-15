
export const logOut = (event, state, updateState, dispatch, openSnackbar,
    navigate, remoteRequest, logOutUser, toggleBlockView) => {

    event.preventDefault();

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }))
    }

    const payload = { method: 'get', credentials: 'include' };

    const callback = (body) => {
        if (body?.result) {

            console.log('Logout success', 'success');

            localStorage.removeItem('user');
            dispatch(logOutUser())
            showSnackBar('Logged out', 'success');
            navigate('/login');
        }
        else if (body?.error === 'not-logged-in') {
            localStorage.removeItem('user');
            navigate('/login');
        }
    }

    remoteRequest('logout', payload, showSnackBar, callback,
        updateState, toggleBlockView, dispatch);
};


export const editProfile = (event, state, updateState, type, dispatch,
    reRouteRequest, remoteRequest, navigate, openSnackbar, toggleBlockView) => {
    console.log('editProfile');
    //const email = state.email;

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }))
    }

    event.preventDefault();

    const payload = { method: 'get', credentials: 'include' };

    const callback = (body) => {
        if (body?.result) {
            navigate('/edit-profile', { state: { ...body.result } })
        }
        else if (body?.error === 'not-logged-in') {
            showSnackBar('You are not logged in', 'error');
            navigate('/login');
        }
        else {
            showSnackBar('Invalid', 'error');
        }
    }

    remoteRequest((type === 'email') ? 'get-email' : 'get-username', payload,
        showSnackBar, callback, updateState, toggleBlockView, dispatch);
}


export const getProfile = (event, state, updateState, dispatch, remoteRequest,
    navigate, openSnackbar, toggleBlockView) => {
    console.log('getProfile');
    //const email = state.email;

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }))
    }

    event.preventDefault();

    const payload = { method: 'get', credentials: 'include' };

    const callback = (body) => {
        if (body?.result) {
            navigate('/profile', { state: { ...body.result } })
        }
        else if (body?.error === 'not-logged-in') {

        }
        else if (body?.error === 'generic') {
            showSnackBar(body?.errMsg, 'error');
        }
    }

    remoteRequest('profile', payload, showSnackBar, callback, updateState, toggleBlockView, dispatch);


} 
