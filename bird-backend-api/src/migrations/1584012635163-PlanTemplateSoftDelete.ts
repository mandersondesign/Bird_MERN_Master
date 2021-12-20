import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanTemplateSoftDelete1584012635163 implements MigrationInterface {
    name = 'PlanTemplateSoftDelete1584012635163'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" ADD "is_active" boolean NOT NULL DEFAULT true`, undefined);
        await queryRunner.query(`SELECT pg_catalog.setval('plan.plan_week_template_plan_week_template_id_seq', 100, true);`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" DROP COLUMN "is_active"`, undefined);
    }

}
