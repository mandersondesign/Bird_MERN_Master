import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanTemplatePush1613976991899 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" ADD "push_message" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" ADD "channel_url" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" DROP COLUMN "channel_url"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" DROP COLUMN "push_message"`, undefined);
    }

}
