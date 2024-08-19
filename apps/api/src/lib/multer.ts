import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

export const uploader = (fileLimit?: number) => {
  const storage = multer.memoryStorage();

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const extAllowed = /\.(jpg|jpeg|png)$/;
    const isExtMatch = file.originalname.toLocaleLowerCase().match(extAllowed);

    if (isExtMatch) {
      cb(null, true);
    } else {
      const error = new Error('Your file exntensions is denied');
      cb(error);
    }
  };
  const limits = { fileSize: fileLimit || 5 * 1024 * 1024 }; // default 5mb

  return multer({ storage, fileFilter, limits });
};
