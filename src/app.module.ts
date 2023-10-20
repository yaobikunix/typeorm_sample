import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// データベース関連
// import { DataSource } from 'typeorm';
import { sqlDataSource } from '../data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

// ユーザー関連
import { UserModule } from './user/user.module';

// テンプレート関連
import { templateCreateUser } from './template/create.user';

/**
 * app.module.tsはアプリケーション（フレームワークの中枢になっている部分で、phpで言うところのbaseに近い）
 */
@Module({
  // まだよく分かっていない、あとで調べる
  exports: [], 

  // アプリケーションに必要なmoduleをimportし管理する
  imports: [
     // データベースへ接続する
    TypeOrmModule.forRoot(sqlDataSource.options),
    
    // UserModuleを呼び出すことで、Userに関する全ての処理が実行できる
    UserModule,
  ],
  // コントローラーの指定：HTTPリクエストやエンドポイントを制御する
  controllers: [AppController],

  // プロバイダーはこのモジュールを成立させるために必要な（サービス）ロジックを指定する場所
  providers: [AppService, TypeOrmModule, templateCreateUser],
})

export class AppModule {
  // データベースとの接続する前にインスタンス化するイメージ
  // constructor(private readonly dataSource: DataSource) {}
}
