import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { uuid } from "uuidv4";
import path from "path";
import fs from "fs";

// middleware to resize uploaded images , to save server storage
export const resizeImage =
  (name: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      // resize single image
      if (req.file) {
        const filename = createNewName(name);
        await sharpTheImage(req.file.buffer, filename);

        // pass the filename to request body
        req.body.image = filename;
      }
      // resize multi images
      else if (req.files) {
        console.log("files", req.files);
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

        // image cover (products module)
        if (files.imageCover) {
          const filename = createNewName(name);
          await sharpTheImage(files.imageCover[0].buffer, filename);

          // pass the filename to request body
          req.body.imageCover = filename;
        }

        // images
        if (files.images) {
          const images: string[] = [];
          files.images.forEach(async (image) => {
            const filename = createNewName(name);
            await sharpTheImage(image.buffer, filename);

            // pass the filename to request body
            req.body.images.push(filename);
          });
          req.body.images = images;
        }
      }
    } catch (error) {
      next(error);
    }

    next();
  };

// helper function to create unique names
const createNewName = (name: string) => {
  return `${name}-${uuid()}-${Date.now()}.jpeg`;
};

const sharpTheImage = async (buffer: any, filename: string) => {
  const uploadsDir = path.join(__dirname, "..", "..", "uploads");

  // ensure uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  await sharp(buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(path.join(uploadsDir, filename));
};
