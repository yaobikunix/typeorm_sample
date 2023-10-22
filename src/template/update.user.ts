import { Injectable } from "@nestjs/common"
import { User } from "src/user/entities/user.entity"

@Injectable()
export class templateUpdateUser {
  // ユーザー情報の更新フォーム
  inputForm(findUser: User) {
    // 送信するパラメータ
    const params = {
      nickName: { name: 'nickName', value: '' },
      isAdult: { name: 'isAdult', value: false }
    }

    return `
      <h1 style="font-weight:bold; margin-bottom:10px;">
        ユーザー情報の更新
      </h1>

      <div style="display:flex; flex-direction:column; gap:10px;">
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
      </div>

      <div style="display:flex; flex-direction:column;">
        <button 
          id="user-update" 
          style="width:50px; margin:10px 0 20px; cursor:pointer;"
        >
          更新
        </button>

        <a href="/user">
          登録者リストへ
        </a>
      </div>
    `
  }

  // ユーザー情報を更新するスクリプト
  actionScript(id: number) {
      return `
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
  }
}