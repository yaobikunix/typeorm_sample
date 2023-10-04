import { DataSource } from "typeorm";
import { User } from "./src/user/entities/user.entity";

/**
 * typeormとデータベースを接続するための中枢ファイル
 */
export const sqlDataSource = new DataSource({
    // データベースの基本設定（本当は.envとして環境変数で呼び込む）
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "mydatabase",

    // テーブル設定(entityとdatabaseの紐付け)
    entities: [User],

    // 作成するファイルの指定先を設定
    migrations: ["src/migrations/*{.js, .ts}"],
    // subscribers: ["src/subscribers/*{.js, .ts}"], 
    // migrationsTableName: "migrations_history", // migrationの名前

    logging: true, // ログを残す
    synchronize: false // 自動的に同期(一般的に本番などでは同期しないのでfalse。注意が必要)
});

// https://www.npmjs.com/package/typeorm?activeTab=readme
sqlDataSource.initialize()
.then(() => {
    console.log("データソースを読み込みました。");
})
.catch((error) => {
    console.log('Error:', error);
});
