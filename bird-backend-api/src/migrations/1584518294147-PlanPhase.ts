import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanPhase1584518294147 implements MigrationInterface {
    name = 'PlanPhase1584518294147'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."phase" ADD "number_of_phase" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."phase" ADD "plan_phase_template_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."phase" ADD CONSTRAINT "FK_8694f6c9d0f1a9e880fda15a785" FOREIGN KEY ("plan_phase_template_id") REFERENCES "plan"."plan_phase_template"("plan_phase_template_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."phase" DROP CONSTRAINT "FK_8694f6c9d0f1a9e880fda15a785"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."phase" DROP COLUMN "plan_phase_template_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."phase" DROP COLUMN "number_of_phase"`, undefined);
    }

}
