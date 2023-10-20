import { Injectable } from "@nestjs/common"

@Injectable()
export class templateCreateUser {
    // ユーザーの入力フォーム
    inputForm(): string {
        // 送信するパラメータ
        const params = {
            nickName: { name: 'nickName', value: '' },
            isAdult: { name: 'isAdult', value: true }
        }

        return `
            <form 
                action="/user/create"
                method="POST" 
                style="display:flex; align-items:flex-start; flex-direction:column;"
            >
                <div style="font-weight:bold; margin-bottom:10px;">
                    ユーザー情報の登録
                </div>

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
                    >
                </div>

                <button type="submit" style="width:50px; margin:10px 0 20px; cursor:pointer;">
                    作成
                </button>
            </form>

            <a href="/user" style="text-decoration:none; border:1px solid; padding:5px; color:black;">
                詳細一覧へ
            </a>
        `
    }
}