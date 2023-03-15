export const getUser = (event, state, updateState, dispatch,
    navigate, inventoryId) => {
    console.log('addToCart');

    event.preventDefault();
    //const nextRoute = state.returnData.nextRoute;

    const showSnackBar = (message, severity) => {
        updateState({
            snackbar: {
                ...state.snackbar, open: true,
                message: message, severity: severity
            }
        })
    }

    if (inventoryId) {
        const body = JSON.stringify({
            inventoryId: inventoryId
        });

        const payload = {
            method: 'post', credentials: 'include', body: body, headers: {
                'Content-Type': 'application/json'
            }
        };

        const callback = (body) => {
            if (body?.result) {


            }
            else if (body?.error === 'not-logged-in') {

            }
            else if (body?.error === 'failed' && body?.errMsg === 'bad-db-input') {
                console.log('email already exits');
            }
            else if (body?.error === 'failed' && body?.errMsg === 'RegenerationErr') {
                console.log('Login now');
            }
            else if (body?.error === 'failed' &&
                (body?.errMsg === 'RegenerationErr' || body?.errMsg === 'savingErr')) {
                console.log('Login now');
            }
            else if (body?.error === 'failed' && body?.errMsg === 'not-created') {
                console.log('Try again');
            }
            else {
                console.log('Try again');
            }
        }

        state.remoteRequest('user-profile', payload, showSnackBar, callback);
    }
    else {
        showSnackBar('All fields are required', 'error');
    }

}

export const getItemDetails = (event, state, updateState, dispatch,
    navigate, inventoryId) => {
    console.log('getItemDetails');

    event.preventDefault();
    //const nextRoute = state.returnData.nextRoute;

    const showSnackBar = (message, severity) => {
        updateState({
            snackbar: {
                ...state.snackbar, open: true,
                message: message, severity: severity
            }
        })
    }

    const payload = {
        method: 'get', credentials: 'include'
    };

    const callback = (body) => {
        if (body?.result) {

            navigate('/item-details', { state: body.result });
        }
        else if (body?.error === 'not-logged-in') {
            //save state, set loginType to pageSwitch 
            // set nexRoute,returnPath,nextRouteState 

            dispatch(state.reRouteRequest({
                nextRoute: '/item-details',
                returnPath: '/item-details/?' + inventoryId,
                returnBody: {},
                returnMethod: 'get', loginType: 'pageSwitch'
            }));

        }
        else if (body?.error === 'failed' && body?.errMsg === 'bad-db-input') {
            console.log('email already exits');
        }
        else if (body?.error === 'failed' && body?.errMsg === 'RegenerationErr') {
            console.log('Login now');
        }
        else if (body?.error === 'failed' &&
            (body?.errMsg === 'RegenerationErr' || body?.errMsg === 'savingErr')) {
            console.log('Login now');
        }
        else if (body?.error === 'failed' && body?.errMsg === 'not-created') {
            console.log('Try again');
        }
        else {
            console.log('Try again');
        }
    }

    state.remoteRequest('item-details/?' + inventoryId, payload, showSnackBar, callback);


}