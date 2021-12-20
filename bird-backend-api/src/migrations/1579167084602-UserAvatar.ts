import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAvatar1579167084602 implements MigrationInterface {
    name = 'UserAvatar1579167084602'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "avatar"`);
    }

}
