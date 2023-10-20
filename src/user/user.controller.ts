
import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect, Res, Header } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';



export const template = (id: number) => {
  return {
    delete: {
      link: `
        <a
          href="/user/${id}"
          id="user-delete"
          style="text-decoration:none; border:1px solid; padding:5px; color:red;
        ">
          削除する
        </a>
      `,
      script: `
        <script>
          document.getElementById('user-delete').addEventListener('click', 
            async() => {
              try {
                const response = await fetch('/user/${id}', {
                  method: 'DELETE',
                  redirect: 'follow',
                }).then((res) => res.json());

                if (response.result) {
                  alert("データを削除しました。");
                  window.location.href = '/'
                } else {
                  alert("データの削除に失敗しました。");
                }

              } catch (err) {
                alert(err.message);
              }
            }
          );
        </script>
      `,
    },
    update: {
      link: `
        <a
          href="/user/${id}/update" 
          data-method="PATCH" 
          id="user-update"
          style="text-decoration:none; border:1px solid; padding:5px; color:blue;
        ">
          編集する
        </a>
      `,
      script: `
        <script>
          document.getElementById('user-update').addEventListener('click', 
            async() => {
              try {
                const response = await fetch('/user/${id}', {
                  method: 'PATCH',
                  redirect: 'follow',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(updateData),
                }).then((res) => res.json());

                if (response.result) {
                  alert("データを編集しました。");
                  window.location.href = '/'
                } else {
                  alert("データの編集に失敗しました。");
                }

              } catch (err) {
                alert(err.message);
              }
            }
          );
        </script>
      `,
    },
  }
}

@Controller('user')
export class UserController {
  constructor(
    // UserService（ロジックいわばモデル部分）の呼び出して下記で使えるようにする
    private readonly userService: UserService
  ) {}

  // 全部
  @Get()
  async findAll(): Promise<string> {
    const users = await this.userService.findAll();

    if (users.length === 0) return '登録されているユーザー情報はありません。';

    const userList = users.map((user) => {
      return `
        <h1>登録者リスト</h1>
        <div>
          <p>登録者名：${user.nickName}</p>
          <a href=/user/${user.id}>詳細を見る</a>
        </div>
      `;
    }).join('');

    return userList
  }

  // 作成
  @Post('create')
  @Redirect('/user')
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<void> {
    console.log(createUserDto)
    return await this.userService.create(createUserDto);
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

    return `
      ${userDescription}
      <div style="display:flex; gap:20px; margin-bottom: 20px;">
        ${template(findUser.id).delete.link}
        ${template(findUser.id).update.link}
      </div>

      <a href="/user">戻る</a>

      ${template(findUser.id).delete.script}
    `;
  }

  // 削除
  @Delete(':id')
  //@Redirect('/user') //リダイレクトがうまくいかないので柳村さんに相談する
  async remove(
    @Param('id') id: string
  ): Promise<object> {
    const isDelete = await this.userService.remove(+id);

    return { 
      result: isDelete
    }
  }

  @Get(':id/update')
  async up(
    @Param('id') id:string
  ): Promise<String> {
    const findUser = await this.userService.findOne(+id);

    // 送信するパラメータ
    const params = {
      nickName: { name: 'nickName', value: '' },
      isAdult: { name: 'isAdult', value: true }
    };
    

    // ユーザ情報を作成するフォーム
    const updateForm = `
        <div style="font-weight:bold; margin-bottom:10px;">
          ユーザー情報の更新
        </div>
        <div>
          <label for="${params.nickName.name}">ユーザー名:</label>
          <input 
            type="text" 
            name="${params.nickName.name}" 
            value="${findUser.nickName}"
          >
        </div>
        <div>
          <label for="isAdult">あなたは20以上ですか？？:</label>
          <input 
            type="checkbox" 
            name="${params.isAdult.name}" 
            value="${params.isAdult.value}"
            ${findUser.isAdult ? 'checked' : ''}
          >
        </div>
        <div>
          <button 
            id="user-update" 
            style="width:50px; margin:10px 0 20px; cursor:pointer;"
          >
          更新
          </button>
        </div>

      <a href="/user" style="text-decoration:none; border:1px solid; padding:5px; color:black;">
        詳細一覧へ
      </a>

      <script>
      document.getElementById('user-update').addEventListener('click', 
        async() => {
          const params = {
            id: ${id},
            nickName: document.querySelector('[name=nickName]').value,
            isAdult: document.querySelector('[name=isAdult]').checked
          }

          try {
            const response = await fetch('/user/${id}', {
              method:'PATCH',
              redirect: 'follow',
              body: JSON.stringify(params),
              headers: {
                'Content-Type': 'application/json',
              }
            }).then((res) => res.json());

            if (response.result) {
              alert("データを編集しました。");
              window.location.href = '/user'
            } else {
              alert("データの編集に失敗しました。");
            }

          } catch (err) {
            alert(err.message);
          }
        }
      );
    </script>
    `

    return updateForm;
  }

  // 更新
  @Patch(':id')
  //@Redirect('/') //リダイレクトがうまくいかないので柳村さんに相談する
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<object> {
    const isUpdate = await this.userService.update(+id, updateUserDto);

    return {
      result: isUpdate
    }
  }
}
