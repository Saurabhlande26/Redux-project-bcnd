import { MigrationInterface, QueryRunner } from "typeorm";

export class Todo1775484325734 implements MigrationInterface {
    name = 'Todo1775484325734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`todo\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`userId\` int NULL,
                PRIMARY KEY (\`id\`)
            )
        `);

        await queryRunner.query(`
            ALTER TABLE \`todo\`
            ADD CONSTRAINT \`FK_user_todo\`
            FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_user_todo\``);
        await queryRunner.query(`DROP TABLE \`todo\``);
    }

}
