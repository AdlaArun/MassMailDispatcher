const {mailIDValidation, invalidEmailIDs, validEmailIDs} = require('./mailValidator')
const multer = require('multer')

let count = 1;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `mails_list${count}.${file.originalname.split('.')[1]}`)
    }
})


const upload = multer({storage: storage})

const fileCount = upload.single('file')

const uploadFile = async(req, res) => {
    if (!req.file) {
        return res.status(400).send("File not uploaded");
    }

    const value = await mailIDValidation(req.file.path)

    if(value === "success") {
        return res.status(200).json({valid: validEmailIDs, invalid: invalidEmailIDs, msg: "success"});
    }
    else if(value === "exceeded") {
        return res.status(200).json({valid: validEmailIDs, invalid: invalidEmailIDs, msg: "exceeded"});
    }

    res.status(404).json({msg: "error"})
}

module.exports = { uploadFile, fileCount, count };

