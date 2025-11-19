import multer from "multer";

// create memory storage to use it to resize images before save to file system
const storage = multer.memoryStorage();

// allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

// upload single image
export const uploadSingleImage = upload.single("image");
