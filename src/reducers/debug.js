let debug = false;
if (localStorage.debug) {
    debug = true;
}
const debugReducer = (state, action) => {
    if (debug) {
        console.log('action', action);
    }
    return true;
}
export default debugReducer;
