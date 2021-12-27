import CryptoJS from 'crypto-js';

const md5 = (s) => CryptoJS.MD5(s).toString();
const cache = window.cache ? window.cache : [];

export const getExampleUrl = (exampleItem) => {
    const ext = 'svg'
    const radical = [exampleItem.diagramType, ext, exampleItem.example].join('/')
    const sum = md5(radical)
    const filename = `${sum}.${ext}`

    if (cache.indexOf(filename) !== -1) {
        return `./cache/${filename}`
    }
    return null;
}

