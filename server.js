import express from 'express';
import ejs from 'ejs';
import multer from 'multer';
import path from 'path';


//set storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
})

//init upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image')



//function to check file type
function checkFileType(file, cb) {
    const fileTypes = /jpeg|png|jpg|git/;

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('error images only!!');
    }
}


//initilaize express
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));


app.get('/', (req, res) => {
    res.render('index')
})

app.post('/upload', (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            res.render('index', {
                msg: error
            });

        } else {
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                res.render('index', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`


                });
            }
        }

    });
});

const PORT = process.env.PORT || 3001;


//server init
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});