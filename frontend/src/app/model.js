const rootUrl = '/api/';
//const rootUrl = '';

//For all making API calls
exports.remoteRequest = (url, payload,
    showSnackBar, callback, updateState, toggleBlockView, dispatch) => {

    dispatch(toggleBlockView({ blockView: true }));//Show a circular progress indicator

    fetch(rootUrl + url, payload).then(
        (response) => {
            response.json().then((body) => {
                dispatch(toggleBlockView({ blockView: false }));//remove the circular progress indicator

                if (response.status !== 200) {
                    //request was rejected by server
                    showSnackBar('Something went wrong...Try again later', 'error');
                }
                else callback(body); //function to call if server accepted the request
            });
        },
        (error) => {
            //Usually caused by device Internet connection
            updateState({ networkIssue: true });
            showSnackBar('Check your Internet connection', 'error');
        }
    );
}
