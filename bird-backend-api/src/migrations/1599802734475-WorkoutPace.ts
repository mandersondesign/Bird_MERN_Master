import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutPace1599802734475 implements MigrationInterface {
    name = 'WorkoutPace1599802734475'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD "completed_distance" numeric(5,3)`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD "avg_pace" numeric(5,3)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP COLUMN "avg_pace"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP COLUMN "completed_distance"`, undefined);
    }

}
