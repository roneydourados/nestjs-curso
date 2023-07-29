import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class FileService {
  async upload(photo: Express.Multer.File, path: string) {
    const buffer = photo.buffer;

    await writeFile(path, buffer);
  }
}
