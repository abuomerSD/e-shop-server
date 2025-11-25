import sharp from "sharp";
import { uuid } from "uuidv4";

// middleware to resize uploaded images , to save server storage
export const resizeImage = (name) => async (req, res, next) => {
  const filename = `${name}-${uuid()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/${filename}`);

  // pass the filename to request body
  req.body.image = filename;

  next();
};
