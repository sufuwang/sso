import { join } from 'path';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import { FileDto } from './dto/file.dto';
import { Response } from 'express';
import { FileFolderPath } from 'src/config';
import { makeFolder } from './utils';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = join(FileFolderPath, `/${req.headers.openid}`);
          makeFolder(uploadPath);
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const random = Math.floor(Math.random() * 1e12);
          const [extname, ...name] = file.originalname.split('.').reverse();
          callback(null, `${name.reverse().join('.')}-${random}.${extname}`);
        },
      }),
    }),
  )
  async uploadFiles(
    @UploadedFiles() files,
    @Body() body: FileDto,
    @Headers('openid') openid: string,
    @Res() response: Response,
  ) {
    if (files.length === 0) {
      return response
        .status(400)
        .json({ success: false, message: 'Must to upload something' });
    }
    const data = await this.fileService.uploadFiles(openid, body, files);
    return response.status(200).json({
      success: true,
      data,
      total: data.length,
      message: 'Success',
    });
  }

  @Get('/')
  getFiles(@Headers('openid') openid: string, @Query() query: FileDto) {
    return this.fileService.getFiles(openid, query);
  }

  @Delete('/')
  deleteFiles(@Headers('openid') openid: string, @Query() query: FileDto) {
    return this.fileService.deleteFiles(openid, query);
  }
}
