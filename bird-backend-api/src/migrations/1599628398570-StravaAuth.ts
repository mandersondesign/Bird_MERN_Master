import {MigrationInterface, QueryRunner} from "typeorm";

export class StravaAuth1599628398570 implements MigrationInterface {
    name = 'StravaAuth1599628398570'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createSchema('strava');
        await queryRunner.query(`CREATE TABLE "strava"."auth" ("user_id" integer NOT NULL, "refresh_token" character varying NOT NULL, "access_token" character varying NOT NULL, "expires_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "strava_athlete_id" integer NOT NULL, CONSTRAINT "REL_b2c7c54baac51f7ca4f2cb313c" UNIQUE ("user_id"), CONSTRAINT "PK_b2c7c54baac51f7ca4f2cb313c9" PRIMARY KEY ("user_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."auth" ADD CONSTRAINT "FK_b2c7c54baac51f7ca4f2cb313c9" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."auth" DROP CONSTRAINT "FK_b2c7c54baac51f7ca4f2cb313c9"`, undefined);
        await queryRunner.query(`DROP TABLE "strava"."auth"`, undefined);
        await queryRunner.dropSchema('strava');
    }

}
