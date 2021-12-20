import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutName1581065972846 implements MigrationInterface {
    name = 'WorkoutName1581065972846'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout_template" ALTER COLUMN "name" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "name" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "name" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout_template" ALTER COLUMN "name" SET NOT NULL`, undefined);
    }

}
