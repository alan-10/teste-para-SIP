import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const tmpfolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpfolder,

  storage: multer.diskStorage({
    destination: tmpfolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');

      const fileName = `${fileHash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
