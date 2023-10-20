import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// TOPページになる可能性が高いので、それに関する処理か全体的な処理かのどちらかと思われる
@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  createUser(): string {
    return this.appService.createUser();
  }
}
