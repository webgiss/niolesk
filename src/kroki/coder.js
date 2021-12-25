import pako from 'pako';


let util = {}

try {
  util = require('util')
} catch { 
}

let TextEncoder = null;

TextEncoder = window.TextEncoder || util.TextEncoder;

export const encode = (source) => {
    const data = new TextEncoder('utf-8').encode(source);
    const compressed = [...pako.deflate(data, { level: 9 })].map((x) => String.fromCharCode(x)).join('');
    return btoa(compressed).replace(/\+/g, '-').replace(/\//g, '_');
}
export const decode = (coded) => {
    const compressed = atob(coded.replace(/-/g, '+').replace(/_/g, '/'));
    return pako.inflate(compressed.split('').map(x => x.charCodeAt(0)), { to: 'string' });
}

window.coder = { encode, decode };
window.pako = pako;
