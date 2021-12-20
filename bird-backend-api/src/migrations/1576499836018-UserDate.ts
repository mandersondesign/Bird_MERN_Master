import {MigrationInterface, QueryRunner} from "typeorm";

export class UserDate1576499836018 implements MigrationInterface {
    name = 'UserDate1576499836018'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "plan_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "is_completed" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "is_completed"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "plan_id"`, undefined);
    }

}
