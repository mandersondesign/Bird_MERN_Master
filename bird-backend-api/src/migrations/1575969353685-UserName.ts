import {MigrationInterface, QueryRunner} from "typeorm";

export class UserName1575969353685 implements MigrationInterface {
    name = 'UserName1575969353685'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "last_name" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "last_name"`, undefined);
    }

}
