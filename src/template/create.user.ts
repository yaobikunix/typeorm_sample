import { Injectable } from "@nestjs/common"

@Injectable()
export class templateCreateUser {
    // ユーザーの入力フォーム
    inputForm(): string {
        // 送信するパラメータ
        const params = {
            nickName: { name: 'nickName', value: '' },
            isAdult: { name: 'isAdult', value: false }
        }

        return `
            <form 
                action="/user/create"
                method="POST" 
                style="display:flex; align-items:flex-start; flex-direction:column; gap:10px;"
            >
                <h1 style="margin-bottom:10px;">
                    ユーザー情報の登録
                </h1>

                <div>
                    <label for="${params.nickName.name}">ユーザー名:</label>
                    <input 
                        type="text" 
                        name="${params.nickName.name}" 
                        value="${params.nickName.value}"
                    >
                </div>

                <div>
                    <label for="isAdult">あなたは20以上ですか？？:</label>
                    <input 
                        type="checkbox"
                        name="${params.isAdult.name}" 
                        value="${params.isAdult.value}"
                        onclick="this.value=this.checked"
                    >
                </div>

                <button id="button" type="submit" style="width:50px; margin:10px 0 20px; cursor:pointer;">
                    作成
                </button>
            </form>

            <script>
                document.querySelector('#button').addEventListener('click', ()=> {
                    alert('checked:'document.querySelector('[name=isAdult]').value)
                })
            </script>

            <a href="/user">
                登録者リストへ
            </a>
        `
    }
}