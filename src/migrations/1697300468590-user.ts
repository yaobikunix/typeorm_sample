import { MigrationInterface, QueryRunner } from "typeorm";

export class User1697300468590 implements MigrationInterface {
    name = 'User1697300468590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickName\` varchar(255) NOT NULL, \`isAdult\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
