import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { uuid } from "uuidv4";

// middleware to resize uploaded images , to save server storage
export const resizeImage = (name: string) => async (req: Request, res: Response, next: NextFunction) => {
  const filename = `${name}-${uuid()}-${Date.now()}.jpeg`;
  if(req.file) {
    await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/${filename}`);

    // pass the filename to request body
  req.body.image = filename;
  }

  next();
};
