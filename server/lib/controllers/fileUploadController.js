var fs  = require("fs");
var multer = require('multer');


function fileUploadController(){

    var storage = multer.diskStorage({
        destination: function (req, file, next) {
            next(null, 'upload-folder')
        },
        filename: function (req, file, next) {
            var extension = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
            next(null, file.fieldname + '-' + Date.now() + "." + extension)
        }
    })

    var upload = multer({ storage: storage });


    function addFile()
    {
        return upload.single('upl');
    }

    return {
        addFile : addFile
    }
}

module.exports = fileUploadController()
