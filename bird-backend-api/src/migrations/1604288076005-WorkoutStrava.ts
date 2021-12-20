import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutStrava1604288076005 implements MigrationInterface {
    name = 'WorkoutStrava1604288076005'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD "strava_activities_count" integer NOT NULL DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP COLUMN "strava_activities_count"`, undefined);
    }

}
