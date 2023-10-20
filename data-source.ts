import { DataSource } from "typeorm";
import { User } from "./src/user/entities/user.entity";
import { dirname } from "path";

/**
 * typeormとデータベースを接続するための中枢ファイル
 */
export const sqlDataSource = new DataSource({
    // データベースの各設定（本当は.envファイルを作成して環境変数から呼び出すが正しい流れっぽい）
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "mydatabase",

    // テーブル設定(entityとdatabaseの紐付けとなる)
    entities: [User],

    /**
     * migrationなどのファイルの読み込み設定
     * migration:runなどコマンドを打った際にどの階層からどのファイルを見るのか
     * 正しく指定をしなければ、エラーが発生しファイルは読み込まれず起動しない。
     * 
     * 【相談】
     * ・private readonly, async await, patch deleteなどの使い方について
     * →　async awaitをよく使うが、controller側？service側?の認識ができていない。
     * 
     * ・migrationの修正方法(run, revert)、削除(drop)、同期（sync）について
     * →　up, downは出来るが更新した時に読み込むソースは変わっていない感じがする。
     * 
     * ・typescriptの型の理解がまだまだ乏しい＋必要なタイミングがいまいちわかってない
     * → 例えば、Promise<User>でも色々あるし、awaitがなくても成立する時がある。
     * 
     * 【補足】
     * ①synchronize:trueにしてると、run:devによって上手いこと同期することがある
     * ②{ts, js}の順序を入れ替えるだけでもエラーが出る（tsかdist内のjsかをちゃんと見ている？）
     * ③package.jsonにtypeorm-ts-node-esmもしくはtypeorm-ts-node-commonjsで違いがある？
     * ④typeormはバージョンが変わっており0.2系と0.3系でコードの書き方がかなり変わっている
     * ⑤バージョンが0.3系になったことによって、使えるメソッドも変わったりしているのでDocumentを見る必要がある
     */
    migrations: [__dirname + "/src/migrations/*.{ts, js}"], //__dirnameは必須
    // subscribers: ["src/subscribers/*.{ts, js}"],
    // migrationsTableName: "migrations_history", //migrationにつける名前

    logging: true, // データベースのQuery文を表示する
    synchronize: false // 自動的に同期(本番では同期しないのでfalse。注意が必要)
});

// https://www.npmjs.com/package/typeorm?activeTab=readme
sqlDataSource.initialize()
.then(() => {
    console.log("データソースを読み込みました。");
})
.catch((error) => {
    console.log('Error:', error);
});
