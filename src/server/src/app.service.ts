import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { ModelsService } from './models/models.service';

@Injectable()
export class AppService {
  constructor(
    private readonly modelsService: ModelsService,
  ) {}

  getHello(): string {
    return 'Hello World! It is finally deployed!';
  }

  @Cron(CronExpression.EVERY_HOUR)
  async runEveryMinute() {
    const models = await this.modelsService.findAll();
    models.forEach(async (model) => {
      await this.modelsService.recalculateReadyQuantity(model.id);
    });
    console.log('Every hour');
  }
}
