/**
 * Promise that delay execution
 * 
 * @param {Number} timeout The timeout to delay
 * @param {T} data A data to pass to the promise
 * @return {Promise<T>}
 * @template T
 */
const delay = (timeout, data) => new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), timeout)
})
export default delay;