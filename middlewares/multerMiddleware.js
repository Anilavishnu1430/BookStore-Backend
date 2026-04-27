const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `img-${file.originalname}`)
  }
})

function fileFilter (req, file, cb) {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
    if(file.mimetype=='image/png' || file.mimetype=='image/jpg' || file.mimetype=='image/jpeg'){
         // To accept the file pass `true`, like so:
         cb(null, true)
    }
    else{
         // To reject this file pass `false`, like so:
        cb(null, false)
        return cb(new Error("Accept only png,jpg,jpeg ..."))
    }

}


const upload = multer({
    storage,fileFilter
}) 

module.exports = upload