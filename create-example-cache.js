import data from './src/examples/data'
import { createHash } from 'crypto'
import axios from 'axios'
import util from 'util'
import stream from 'stream'
import fs from 'fs'

const pipeline = util.promisify(stream.pipeline)
const fileExists = (path) => new Promise((resolve, reject) => {
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            resolve(false);
        } else {
            resolve(true);
        }
    })
})

const writeToFile = (path, content) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path);
        file.write(content);
        file.end();
        file.on("finish", () => { resolve(true); });
        file.on("error", reject);
    });
}

const md5 = (s) => createHash('md5').update(s).digest('hex');
const engine = 'https://kroki.io'
const dirname = './public/cache'

const createCache = async (example) => {
    const ext = 'svg'
    const radical = [example.diagramType, 'svg', example.example].join('/')
    const url = `${engine}/${radical}`
    const sum = md5(radical)

    const response = await axios.get(url, { responseType: 'stream' })
    const filename = `${sum}.${ext}`
    const fullFilename = `${dirname}/${filename}`
    if (! await fileExists(fullFilename)) {
        console.log(`${sum} : ${example.title} - ${example.description}`)
        await pipeline(response.data, fs.createWriteStream(fullFilename))
    }
    return filename
}

const main = async () => {
    if (! await fileExists(dirname)) {
        await fs.promises.mkdir(dirname)
    }
    const cache = await Promise.all(data.map(createCache))
    await writeToFile('./public/cache.js', `window.cache = ${JSON.stringify(cache.sort())};`)
}

main()