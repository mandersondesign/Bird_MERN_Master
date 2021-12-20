import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutTemplateFK1584003622765 implements MigrationInterface {
    name = 'WorkoutTemplateFK1584003622765'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP CONSTRAINT IF EXISTS "workout_workout_template_id_fkey"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD CONSTRAINT "workout_workout_template_id_fkey" FOREIGN KEY ("workout_template_id") REFERENCES "workout_template"("workout_template_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
