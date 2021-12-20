import {MigrationInterface, QueryRunner} from "typeorm";

export class UserActivation1574933680479 implements MigrationInterface {
    name = 'UserActivation1574933680479'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "is_email_confirmed" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "is_email_confirmed"`, undefined);
    }

}
