import { Injectable } from '@nestjs/common';
import { templateCreateUser } from './template/create.user';

@Injectable()
export class AppService {
  constructor(
    private readonly templateCreateUser: templateCreateUser
  ) {}

  createUser(): string {
    // ユーザ情報を作成するテンプレートを呼び出す
    return this.templateCreateUser.inputForm()
  }
}
