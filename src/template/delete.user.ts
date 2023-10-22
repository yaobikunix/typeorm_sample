import { Injectable } from "@nestjs/common"

@Injectable()
export class templateDeleteUser {
  // ユーザーを削除するスクリプト
  actionScript(id: number): string {
    // 送信するパラメータ
    const params = {
      nickName: { name: 'nickName', value: '' },
      isAdult: { name: 'isAdult', value: false }
    }

    return `
      <script>
        document.getElementById('user-delete').addEventListener('click', async() => {
          try {
            const response = await fetch('/user/${id}', {
              method: 'DELETE',
              redirect: 'follow',
            }).then((res) => res.json());

            if (response.result) {
              alert("データを削除しました。");
              window.location.href = '/';
            } else {
              alert("データの削除に失敗しました。");
            }

          } catch (err) {
            alert(err.message);
          }
        });
      </script>
    `
  }
}