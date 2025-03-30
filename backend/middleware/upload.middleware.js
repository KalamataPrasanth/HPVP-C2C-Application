import multer from 'multer';
import path from 'path';
import fs from 'fs';

//ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, {recursive: true});
}

// storage configutarion
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// allow only images
const fileFilter = (req, file, cb) => {
    if (file && file.mimetype && file.mimetype.startsWith("image/")){
        cb(null, true);
    }else{
        cb(new Error("Only images are allowed"), false)
    }
};

const upload = multer({ storage, fileFilter });

export default upload;