const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = 'images/';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },

  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },

});



const types = ['image/webp', 'image/png', 'image/gif', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
    return file.status(400).json({ message: 'Only images are allowed.' });
  }
};

module.exports = multer({ storage, fileFilter });
