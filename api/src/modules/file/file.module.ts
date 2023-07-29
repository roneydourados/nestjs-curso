import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
  imports: [FileService],
  exports: [FileService],
})
export class FileModule {}
