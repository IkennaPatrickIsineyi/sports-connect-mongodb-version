
const getHomePage = (state, updateState, remoteRequest, dispatch,
    loadUserData, openSnackbar, navigate, toggleBlockView) => {

    console.log('getHomePage')
    updateState({ checking: true });

    const showSnackBar = (message, severity) => {
        dispatch(openSnackbar({ message: message, severity: severity }))
    }

    const payload = { method: "get", credentials: 'include' };
    const callback = (body) => {
        //updateState({ frontPageData: body.result.frontPage, userData: body.result.userData }); 
        //dispatch(loadFrontPageData(body.result.frontPage));
        //dispatch(loadUserData(body.result.userData));
        if (body?.result) {

            const userData = body.userData;

            userData?.username && dispatch(loadUserData({
                username: userData?.username, emailVerified: userData?.emailVerified
            }));

            updateState({ data: body.result });

        }
        else if (body?.error === 'not-logged-in') {
            navigate('/login');
        }
        else if (body?.error === 'generic') {
            showSnackBar(body?.errMsg, 'error');
        }
        else {
            showSnackBar('Something went wrong. Kindly refresh', 'error');
        }
    }
    remoteRequest('', payload, showSnackBar, callback, updateState, toggleBlockView, dispatch);

};

export { getHomePage };