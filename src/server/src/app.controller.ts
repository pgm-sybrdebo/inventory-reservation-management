import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';
import { AppService } from './app.service';
import { extname } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('uploadDamagePicture')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/damages',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedDamageImage(@UploadedFile() file) {
    const ext = extname(file.originalname);
    const response = {
      // originalname: file.originalname,
      filename: file.filename,
      type: ext.replace('.', ''),
    };
    return response;
  }

  @Post('uploadDeviceQrCode')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/devices',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedDeviceQrCode(@UploadedFile() file) {
    const ext = extname(file.originalname);
    const response = {
      filename: file.filename,
      type: ext.replace('.', ''),
    };
    return response;
  }

  @Post('uploadModelPictures')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './uploads/models',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedModulesImages(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const ext = extname(file.originalname);
      const fileReponse = {
        filename: file.filename,
        type: ext.replace('.', ''),
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get('model-image/:imgName')
  findModelImage(@Param('imgName') image, @Res() res) {
    return res.sendFile(image, { root: './uploads/models' });
  }

  @Get('damage-image/:imgName')
  findDamageImage(@Param('imgName') image, @Res() res) {
    return res.sendFile(image, { root: './uploads/damages' });
  }

  @Get('qrCode/:imgName')
  findQrCode(@Param('imgName') image, @Res() res) {
    return res.sendFile(image, { root: './uploads/devices' });
  }
}
