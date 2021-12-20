import {MigrationInterface, QueryRunner} from "typeorm";

export class StravaRefacroting1603096723733 implements MigrationInterface {
    name = 'StravaRefacroting1603096723733'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "strava"."athlete" ("strava_athlete_id" integer NOT NULL, "refresh_token" character varying NOT NULL, "access_token" character varying NOT NULL, "expires_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_709317ff6f5f757f48300a2000e" PRIMARY KEY ("strava_athlete_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."auth" ADD CONSTRAINT "FK_9000b28248c4831874aba0e17d3" FOREIGN KEY ("strava_athlete_id") REFERENCES "strava"."athlete"("strava_athlete_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."auth" DROP CONSTRAINT "FK_9000b28248c4831874aba0e17d3"`, undefined);
        await queryRunner.query(`DROP TABLE "strava"."athlete"`, undefined);
    }

}
