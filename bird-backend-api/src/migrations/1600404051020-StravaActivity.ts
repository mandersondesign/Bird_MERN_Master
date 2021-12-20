import {MigrationInterface, QueryRunner} from "typeorm";

export class StravaActivity1600404051020 implements MigrationInterface {
    name = 'StravaActivity1600404051020'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "strava"."activity" ("activity_id" integer NOT NULL, "strava_athlete_id" integer NOT NULL, "user_id" integer NOT NULL, "name" character varying NOT NULL, "completed_distance" numeric(5,3), "moving_time" integer, "elapsed_time" integer, "start_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6f6411b6e448b1d576105f4be62" PRIMARY KEY ("activity_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."activity" ADD CONSTRAINT "FK_b8419e7468648e67adbdfc5ffdd" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."activity" DROP CONSTRAINT "FK_b8419e7468648e67adbdfc5ffdd"`, undefined);
        await queryRunner.query(`DROP TABLE "strava"."activity"`, undefined);
    }

}
