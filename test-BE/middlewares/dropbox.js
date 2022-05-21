const res = require('express/lib/response')
const { Readable } = require('stream')
require('isomorphic-fetch')
const Dropbox = require('dropbox').Dropbox

const listFiles = async (req, res, next) => {
  try {
    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN })
    const { result } = await dbx.filesListFolder({path: '', limit: 10})
    const { cursor } = await dbx.filesListFolderGetLatestCursor({path: ''})
    console.log('entries', result.entries)
    console.log('more files?', result.has_more)
    console.log('cursor',cursor)
    console.log('res.cursor',result.cursor)
    res.send(result.entries)
  } catch(err) {
    next(err)
  }
}

const getMoreFiles = async  (req, res, next)  => {
  try{
    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN })
    const { result }  = await dbx.filesListFolderContinue({cursor})
    console.log('adding entries', result.entries)
    res.send(result.entries)
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
