import { sqlDataSource } from '../data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';

/**
 * app.module.tsは、アプリケーション（フレームワークの中枢になっている部分phpで言うところのbaseに近い）
 */
@Module({
  // あとで調べる
  // exports: [],
  imports: [
     // データベースへの接続
    TypeOrmModule.forRoot(sqlDataSource.options),
    
    // UserModuleを呼び出すことでUserに関する全ての処理が実行される
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmModule],
})

export class AppModule {
  // データベースとの接続する前にインスタンス化するイメージ（インスタンス化してなかったらエラーになると思われる）
  constructor(private dataSource: DataSource) {}
}
