import {MigrationInterface, QueryRunner} from "typeorm";

export class StravaWorkout1600256948062 implements MigrationInterface {
    name = 'StravaWorkout1600256948062'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "strava"."workout" ("workout_id" integer NOT NULL, "completed_distance" numeric(5,3), "avg_pace" numeric(5,3), "moving_time" integer, "elapsed_time" integer, "distance" text array, "time" text array, "moving" text array, "cadence" text array, CONSTRAINT "REL_21946a881f38c2fa43e424324f" UNIQUE ("workout_id"), CONSTRAINT "PK_21946a881f38c2fa43e424324fc" PRIMARY KEY ("workout_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."workout" ADD CONSTRAINT "FK_21946a881f38c2fa43e424324fc" FOREIGN KEY ("workout_id") REFERENCES "plan"."workout"("worktout_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."workout" DROP CONSTRAINT "FK_21946a881f38c2fa43e424324fc"`, undefined);
        await queryRunner.query(`DROP TABLE "strava"."workout"`, undefined);
    }

}
