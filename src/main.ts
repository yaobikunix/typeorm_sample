import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // バリデーションの設定(グローバルの場合はここに記述する)
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //   })
  // );

  await app.listen(3000);
}
bootstrap();
