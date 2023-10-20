import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

// Moduleは主にphpで言うところのbaseにあたる（ここではコンテンツ毎にそれができるので良い）
@Module({
  // データベースとUserテーブルをforFeatureで紐づけることができる
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule {}
