
import { Controller, Get, Req, Post, Body, Patch, Param, Delete, Redirect, Res, Header } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// バリーデーション関連
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

// ユーザーの削除・編集を実行する為のテンプレート＋スクリプトの呼び出し
import { templateDeleteUser } from 'src/template/delete.user'; 
import { templateUpdateUser } from 'src/template/update.user'; 

// 削除、編集を行うためのリンク
export const selectLinks = (id: number) => {
  return {
    delete: `
      <a
        href="/user/${id}"
        id="user-delete"
        style="text-decoration:none; border:1px solid; padding:5px; color:red;"
      >
        削除する
      </a>
    `,
    update: `
      <a
        href="/user/${id}/update" 
        data-method="PATCH" 
        id="user-update"
        style="text-decoration:none; border:1px solid; padding:5px; color:blue;"
      >
        編集する
      </a>
    `,
  }
}

@Controller('user')
export class UserController {
  // UserService（ロジックいわばモデル部分）の呼び出して下記で使えるようにする
  constructor(
    private readonly userService: UserService,
    private readonly templateDeleteUser: templateDeleteUser,
    private readonly templateUpdateUser: templateUpdateUser
  ) {}

  // 全部
  @Get()
  async findAll(): Promise<string> {
    const users = await this.userService.findAll();

    if (users.length === 0) return '登録されているユーザー情報はありません。';

    const userList = users.map((user) => {
      return `
        <div style="border-bottom:2px solid #E0E0E0; padding-bottom: 20px;">
          <p>登録者名：${user.nickName}</p>
          <a href=/user/${user.id}>詳細を見る</a>
        </div>
      `;
    }).join('');

    return `
      <h1>登録者リスト</h1>
      ${userList}
    `
  }

  // 作成
  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true })) // バリーデーション機能をONにする
  @Redirect('/user')
  async create(
    @Body() createUser: CreateUserDto
  ): Promise<void> {
    console.log(createUser)
    const isSaved = await this.userService.create(createUser);

    if (!isSaved) {
      throw new Error('データの保存に失敗しました');
    }
  }

  // 詳細
  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<string> {
    // +idでないと取得できない理由はまた柳村さんに聞いてみよう
    const findUser = await this.userService.findOne(+id);

    if (!findUser) return 'ユーザーの情報が見つかりません。';

    const userDescription = `
      <div>
        <p>名前: ${findUser.nickName}</p>
        <p>備考: 私は${findUser.isAdult ? '成人' : '未成年'}者です</p>
      </div>
    `;

    // ユーザー情報を削除するためのスクリプト
    const deleteUserScript = this.templateDeleteUser.actionScript(+id)

    return `
      <div>
        ${userDescription}
        <div style="display:flex; gap:20px; margin-bottom: 20px;">
          ${selectLinks(+id).delete}
          ${selectLinks(+id).update}
        </div>
        <a href="/user">戻る</a>
      </div>

      ${deleteUserScript}
    `;
  }

  // 削除
  @Delete(':id')
  //@Redirect('/user') // 何故かリダイレクトがうまくいかないので柳村さんに相談する
  async remove(
    @Param('id') id: string
  ): Promise<object> {
    const isDelete = await this.userService.remove(+id);

    return { 
      result: isDelete
    }
  }

  // 編集
  @Get(':id/update')
  async up(
    @Param('id') id:string
  ): Promise<String> {
    const findUser = await this.userService.findOne(+id);

    // ユーザ情報を更新するフォーム
    const updateUserForm = this.templateUpdateUser.inputForm(findUser);

    // ユーザー情報を更新するSクリプト
    const updateUserScript = this.templateUpdateUser.actionScript(+id)

    return `
      ${updateUserForm}
      ${updateUserScript}
    `
  }

  // 更新
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true })) // バリーデーション機能をONにする
  //@Redirect('/') // 何故かリダイレクトがうまくいかないので柳村さんに相談する
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<object> {
    console.log('update', updateUserDto)
    const isUpdate = await this.userService.update(+id, updateUserDto);

    return {
      result: isUpdate
    }
  }
}
