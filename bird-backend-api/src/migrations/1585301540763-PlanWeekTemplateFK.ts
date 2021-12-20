import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanWeekTemplateFK1585301540763 implements MigrationInterface {
    name = 'PlanWeekTemplateFK1585301540763'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout_template" DROP CONSTRAINT "workout_template_plan_week_template_id_fkey"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout_template" ADD CONSTRAINT "workout_template_plan_week_template_id_fkey" FOREIGN KEY ("plan_week_template_id") REFERENCES "plan_week_template"("plan_week_template_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
