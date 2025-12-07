import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { uuid } from "uuidv4";

// middleware to resize uploaded images , to save server storage
export const resizeImage =
  (name: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      // resize single image
      if (req.file) {
        const filename = createNewName(name);
        await sharp(req.file.buffer)
          .resize(600, 600)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/${filename}`);

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
          await sharp(files.imageCover[0].buffer)
            .resize(600, 600)
            .toFormat("jpeg")
            .jpeg({ quality: 95 })
            .toFile(`uploads/${filename}`);

          // pass the filename to request body
          req.body.imageCover = filename;
        }

        // images
        if (files.images) {
          const images: string[] = [];
          files.images.forEach(async (image) => {
            const filename = createNewName(name);
            await sharp(image.buffer)
              .resize(600, 600)
              .toFormat("jpeg")
              .jpeg({ quality: 95 })
              .toFile(`uploads/${filename}`);

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
