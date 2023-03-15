const rootUrl = '/api/';
//const rootUrl = '';

exports.remoteRequest = (url, payload,
    showSnackBar, callback, updateState, toggleBlockView, dispatch) => {
    dispatch(toggleBlockView({ blockView: true }))
    console.log('request loading', payload);
    fetch(rootUrl + url, payload).then(
        (response) => {
            response.json().then((body) => {
                dispatch(toggleBlockView({ blockView: false }))
                console.log('report: ', body);
                if (response.status !== 200) {
                    console.log('Something went wrong...Try again later');
                    showSnackBar('Something went wrong...Try again later', 'error');
                }
                else callback(body);
            });
        },
        (error) => {
            updateState({ networkIssue: true });
            showSnackBar('Check your Internet connection', 'error');
        }
    );
}
