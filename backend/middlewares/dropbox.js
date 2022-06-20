const { Readable } = require('stream')
require('isomorphic-fetch')
const { Dropbox } = require('dropbox')

const listFiles = async (req, res, next) => {
  try {
    const { limit = process.env.COUNT, dropboxToken } = req.query
    const dbx = new Dropbox({ accessToken: dropboxToken })
    const { result } = await dbx.filesListFolder({ path: '', limit })
    res.send({ entries: result.entries, cursor: result.cursor })
  } catch (err) {
    next(err)
  }
}

const getMoreFiles = async (req, res, next) => {
  try {
    const { cursor, dropboxToken } = req.query
    const dbx = new Dropbox({ accessToken: dropboxToken })
    const { result } = await dbx.filesListFolderContinue({ cursor })
    res.send({ entries: result.entries, cursor: result.cursor })
  } catch (err) {
    next(err)
  }
}

const downloadFile = async (req, res, next) => {
  try {
    const { path, dropboxToken } = req.query

    if (!path || !path.length) {
      throw new Error('path is not defined')
    }

    const dbx = new Dropbox({ accessToken: dropboxToken })
    const file = await dbx.filesDownload({ path })

    const stream = Readable.from(file.result.fileBinary)
    return stream.pipe(res)
  } catch (err) {
    if (err.status === 409) {
      const error = new Error()
      error.status = 404
      return next(error)
    }
    return next(err)
  }
}

module.exports = {
  listFiles,
  downloadFile,
  getMoreFiles,
}
