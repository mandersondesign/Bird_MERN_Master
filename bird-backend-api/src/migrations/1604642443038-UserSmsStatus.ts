import {MigrationInterface, QueryRunner} from "typeorm";

export class UserSmsStatus1604642443038 implements MigrationInterface {
    name = 'UserSmsStatus1604642443038'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "is_sms_enabled" boolean NOT NULL DEFAULT true`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "is_sms_enabled"`, undefined);
    }

}
