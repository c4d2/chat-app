var express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var router = express.Router();

const dirpath = path.join(__dirname, '..', 'asset/image')

//递归创建文件夹的函数
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
// /在使用multer之前，需要配置中间件。以下是一个简单的配置：
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //递归创建文件夹
        mkdirsSync(dirpath)
        //将文件放在这里面
        cb(null, dirpath)
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const extname = path.extname(file.originalname);
        cb(null, `image_${timestamp}${extname}`);
    }
});


const upload = multer({ storage: storage });
const uploadsingle = upload.single('image');

router.post('/auth/setavatar', (req, res) => {
    uploadsingle(req, res, err => {
        if (err) {
            return res.send({
                status: 1,
                msg: '文件上传失败！'
            })
        }
        var file = req.file;
        res.send({ status: 0, data: file })
    })
});

module.exports = router;