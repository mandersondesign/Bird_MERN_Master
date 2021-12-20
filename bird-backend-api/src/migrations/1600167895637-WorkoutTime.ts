import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutTime1600167895637 implements MigrationInterface {
    name = 'WorkoutTime1600167895637'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD "moving_time" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD "elapsed_time" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP COLUMN "elapsed_time"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP COLUMN "moving_time"`, undefined);
    }

}
