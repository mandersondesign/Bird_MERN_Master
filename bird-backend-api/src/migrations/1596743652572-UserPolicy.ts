import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPolicy1596743652572 implements MigrationInterface {
    name = 'UserPolicy1596743652572'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "is_policy_accepted" boolean NOT NULL DEFAULT true`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "is_policy_accepted"`, undefined);
    }

}
