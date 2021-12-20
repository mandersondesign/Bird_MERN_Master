import {MigrationInterface, QueryRunner} from "typeorm";

export class StravaSplit1600855357742 implements MigrationInterface {
    name = 'StravaSplit1600855357742'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "strava"."split" ("strava_split_id" SERIAL NOT NULL, "activity_id" bigint NOT NULL, "strava_athlete_id" integer NOT NULL, "user_id" integer NOT NULL, "workout_id" integer NOT NULL, "avg_speed" numeric(5,3), "distance" numeric(5,3), "moving_time" integer, "elapsed_time" integer, "split" integer, CONSTRAINT "PK_0547195816f16659eaed980f69c" PRIMARY KEY ("strava_split_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" ADD CONSTRAINT "FK_36054a123923149bba7f5418aeb" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" ADD CONSTRAINT "FK_69f240d8e39f99bb74778e53094" FOREIGN KEY ("workout_id") REFERENCES "plan"."workout"("worktout_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."split" DROP CONSTRAINT "FK_69f240d8e39f99bb74778e53094"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" DROP CONSTRAINT "FK_36054a123923149bba7f5418aeb"`, undefined);
        await queryRunner.query(`DROP TABLE "strava"."split"`, undefined);
    }

}
