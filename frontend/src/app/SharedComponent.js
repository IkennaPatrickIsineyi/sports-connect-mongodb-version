//const { Snackbar } = require("@mui/material")
import Snackbar from '@mui/material/Snackbar';

/**
     * Add the following snackbar key to the state object definition.
     * 
     * snackbar: { open: false, message: '', severity: '', autoHideDuration: 6000 }.
     * 
     * It makes it easier to control snackbar.
     */

const snackBar = (state, updateState) => {

    const handleClose = () => {
        updateState({ snackbar: { ...state.snackbar, open: false } })
    }
    return <Snackbar open={state.snackbar.open}
        autoHideDuration={state.snackbar.autoHideDuration}
        message={state.snackbar.message}
        severity={state.snackbar.severity}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose} />
}

export { snackBar }