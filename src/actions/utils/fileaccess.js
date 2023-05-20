import { get, set, keys, del } from 'idb-keyval'

/**
 * @typedef {Object} FullFilename
 * @property {string} repo The name of the repo used
 * @property {string[]} path_parts The directory names of the path to the file
 * @property {string|null} filename The name of the file
 */

/**
 * @typedef {Object} DirectoryList
 * @property {FullFilename} fullFilename The fullFilename of the directory
 * @property {string[]} directories The list of the directories in the directory
 * @property {string[]} files The list of the files in the directory
 */

const exportOnWindow = (elements) => {
    for (const key in elements) {
        window[key] = elements[key]
    }
}

const directoryHandleCache = {}

const directoryHandlePrefix = 'dh.'

const get_dh = async (repo) => {
    const dh_name = `${directoryHandlePrefix}${repo}`
    const directoryHandle = directoryHandleCache[dh_name]
    if (directoryHandle) {
        return directoryHandle
    }
    return await get(dh_name)
}

const set_dh = async (repo, directoryHandle) => {
    const dh_name = `${directoryHandlePrefix}${repo}`
    directoryHandleCache[dh_name] = directoryHandle
    await set(dh_name, directoryHandle)
}

const lsRepo = async () => (await keys()).filter((x) => x.startsWith(directoryHandlePrefix)).map((x) => x.slice(directoryHandlePrefix.length))

const unlinkRepo = async (repo) => {
    const dh_name = `${directoryHandlePrefix}${repo}`
    delete directoryHandleCache[dh_name]
    await del(dh_name)
}

const getNewDirectoryHandle = async () => await window.showDirectoryPicker({ mode: 'readwrite' })

const setDirectoryHandle = async (directoryHandle, repo) => await set_dh(repo, directoryHandle)

/**
 * Get a directory handle on a repo
 * @param {string} repo The name of the repo used to store files
 * 
 */
const getDirectoryHandle = async (repo) => {
    /** @type {FileSystemDirectoryHandle} */
    let directoryHandle = await get_dh(repo)
    if (!directoryHandle) {
        directoryHandle = await window.showDirectoryPicker({ mode: 'readwrite', id: repo })
        await set_dh(repo, directoryHandle)
    } else {
        if (await directoryHandle.queryPermission({ mode: 'readwrite' }) === 'prompt') {
            await directoryHandle.requestPermission({ mode: 'readwrite' })
        }
    }
    // console.log({ directoryHandle, dh_name })
    if (directoryHandle && await directoryHandle.queryPermission({ mode: 'readwrite' }) === 'granted') {
        return directoryHandle
    }
    return null
}


const directoryHandlePromiseCache = {}
const getDirectoryHandleUsingCache = (repo) => {
    if (directoryHandlePromiseCache[repo] === undefined) {
        directoryHandlePromiseCache[repo] = getDirectoryHandle(repo)    
    }
    return directoryHandlePromiseCache[repo]
}

/**
 * Get a DirectoryHandle on a sub directory
 * @param {FullFilename} fullFilename The fullFilename of the directory to get a handle to
 * @returns 
 */
const getSubDirectoryHandle = async (fullFilename) => {
    const { repo, path_parts } = fullFilename
    const directoryHandle = await getDirectoryHandleUsingCache(repo)
    let currentHandle = directoryHandle
    if (path_parts && currentHandle) {
        for (let path_part of path_parts) {
            if (currentHandle) {
                currentHandle = await currentHandle.getDirectoryHandle(path_part, { mode: 'readwrite' })
            }
        }
    }
    return currentHandle
}

/**
 * Return the content of a directory
 * @param {FullFilename} fullFilename The filename to query
 */
const lsDir = async (fullFilename) => {
    const { repo, path_parts } = fullFilename
    const subDirectoryHandle = await getSubDirectoryHandle(fullFilename)
    /** @type{DirectoryList} */
    const result = {
        fullFilename: { repo, path_parts, filename: null },
        directories: [],
        files: []
    }
    if (subDirectoryHandle) {
        // console.log({ subDirectoryHandle })
        const keysIterator = subDirectoryHandle.values()
        // console.log({ keysIterator })
        for await (let subhandle of keysIterator) {
            if (subhandle.kind === 'file') {
                result.files.push(subhandle.name)
            } else if (subhandle.kind === 'directory') {
                result.directories.push(subhandle.name)
            }
        }
    }
    return result
}

/**
 * Get a file handle on a file using a mode
 * 
 * @param {FullFilename} fullFilename 
 * @param {string} mode 
 * @returns 
 */
const getFileHandle = async (fullFilename, mode) => {
    const { filename } = fullFilename
    const subDirectoryHandle = await getSubDirectoryHandle(fullFilename)
    let fileHandle = null
    fileHandle = await subDirectoryHandle.getFileHandle(filename, { mode, create: mode === 'readwrite' })

    return fileHandle
}

/**
 * Get the content of a file as string
 * @param {FullFilename} fullFilename The fullFilename of the file
 * @returns
 */
const readFile = async (fullFilename) => {
    let fileHandle = null
    try {
        fileHandle = await getFileHandle(fullFilename, 'read')
    }
    catch {
        return null
    }
    const file = await fileHandle.getFile()
    const stream = file.stream()
    const reader = stream.getReader()
    const buffer = await reader.read()
    const decoder = new TextDecoder('utf-8')
    const decodedString = decoder.decode(buffer.value)
    return decodedString
}

/**
 * Write a content into a file
 * @param {FullFilename} fullFilename The fullFilename of the file
 * @param {string} content 
 */
const writeFile = async (fullFilename, content) => {
    const fileHandle = await getFileHandle(fullFilename, 'readwrite')
    const writable = await fileHandle.createWritable()
    await writable.write(content)
    await writable.close()
}

const FullFilename = (repo, path_parts, filename) => ({ repo, path_parts, filename })

exportOnWindow({ getDirectoryHandle, getNewDirectoryHandle, setDirectoryHandle, lsRepo, unlinkRepo, lsDir, readFile, writeFile, FullFilename })
exportOnWindow({ get, set, keys, del })

export { getDirectoryHandle, getNewDirectoryHandle, setDirectoryHandle, lsRepo, unlinkRepo, lsDir, readFile, writeFile, FullFilename }