import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutWithoutTemplate1580385604980 implements MigrationInterface {
    name = 'WorkoutWithoutTemplate1580385604980'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "workout_template_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "workout_template_id" SET NOT NULL`);
    }

}
