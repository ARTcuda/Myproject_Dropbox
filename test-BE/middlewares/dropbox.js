const res = require('express/lib/response')
const { Readable } = require('stream')
require('isomorphic-fetch')
const Dropbox = require('dropbox').Dropbox

const listFiles = async (req, res, next) => {
  try {
    const { cursor, limit = process.env.COUNT } = req.query
    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN })
    const { result } = await dbx.filesListFolder({path: '', limit })
    res.send({ entries: result.entries, cursor: result.cursor })
  } catch(err) {
    next(err)
  }
}

const getMoreFiles = async  (req, res, next)  => {
  try{
    const { cursor } = req.query
    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN })
    const { result }  = await dbx.filesListFolderContinue({ cursor })
    res.send({ entries: result.entries, cursor: result.cursor })
  } catch(err) {
    next(err)
  }
}

const downloadFile = async (req, res, next) => {
  try{
    const { path } = req.query

    if (!path || !path.length) {
      throw new Error('path is not defined')
    }

    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN})
    const file = await dbx.filesDownload({ path })

    const stream = Readable.from(file.result.fileBinary)
    return stream.pipe(res)
  } catch(err) {
    if (err.status == 409) {
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
  getMoreFiles
}
