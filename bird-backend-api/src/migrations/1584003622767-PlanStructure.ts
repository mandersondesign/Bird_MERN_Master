import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanStructure1584003622767 implements MigrationInterface {
    name = 'PlanStructure1584003622767'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."phase" DROP CONSTRAINT "phase_coach_id_fkey"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" DROP CONSTRAINT "plan_week_template_plan_template_id_fkey"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" DROP CONSTRAINT "plan_week_template_phase_id_fkey"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" DROP CONSTRAINT "plan_template_event_id_fkey"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" DROP CONSTRAINT "plan_template_coach_id_fkey"`, undefined);
        await queryRunner.query(`CREATE TABLE "plan"."plan_phase_template" ("plan_phase_template_id" SERIAL NOT NULL, "plan_template_id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "number_of_phase" integer, CONSTRAINT "PK_f3d3845f24dfcf22f2f6f1002c7" PRIMARY KEY ("plan_phase_template_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" DROP COLUMN "plan_template_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" DROP COLUMN "phase_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" DROP COLUMN "number_of_phase"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" ADD "plan_phase_template_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."phase" ALTER COLUMN "created_at" TYPE TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" ADD CONSTRAINT "FK_f4809f9a79100633526acd400b5" FOREIGN KEY ("plan_phase_template_id") REFERENCES "plan"."plan_phase_template"("plan_phase_template_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_phase_template" ADD CONSTRAINT "FK_ee979243b9e671536590e0877ef" FOREIGN KEY ("plan_template_id") REFERENCES "plan"."plan_template"("plan_template_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_phase_template" DROP CONSTRAINT "FK_ee979243b9e671536590e0877ef"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" DROP CONSTRAINT "FK_f4809f9a79100633526acd400b5"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."phase" ALTER COLUMN "created_at" TYPE TIMESTAMP(0)`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" DROP COLUMN "plan_phase_template_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" ADD "number_of_phase" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" ADD "phase_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" ADD "plan_template_id" integer NOT NULL`, undefined);
        await queryRunner.query(`DROP TABLE "plan"."plan_phase_template"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" ADD CONSTRAINT "plan_template_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" ADD CONSTRAINT "plan_template_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" ADD CONSTRAINT "plan_week_template_phase_id_fkey" FOREIGN KEY ("phase_id") REFERENCES "phase"("phase_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" ADD CONSTRAINT "plan_week_template_plan_template_id_fkey" FOREIGN KEY ("plan_template_id") REFERENCES "plan_template"("plan_template_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."phase" ADD CONSTRAINT "phase_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
