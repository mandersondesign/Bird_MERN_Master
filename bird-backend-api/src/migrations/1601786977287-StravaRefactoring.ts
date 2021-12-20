import {MigrationInterface, QueryRunner} from "typeorm";

export class StravaRefactoring1601786977287 implements MigrationInterface {
    name = 'StravaRefactoring1601786977287'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."activity" DROP CONSTRAINT "FK_b8419e7468648e67adbdfc5ffdd"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" DROP CONSTRAINT "FK_69f240d8e39f99bb74778e53094"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" DROP CONSTRAINT "FK_36054a123923149bba7f5418aeb"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."activity" DROP COLUMN "user_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" DROP COLUMN "user_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" DROP COLUMN "workout_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD "strava_activity_id" bigint`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."auth" DROP CONSTRAINT "FK_b2c7c54baac51f7ca4f2cb313c9"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."auth" ADD CONSTRAINT "UQ_b2c7c54baac51f7ca4f2cb313c9" UNIQUE ("user_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."auth" ADD CONSTRAINT "FK_b2c7c54baac51f7ca4f2cb313c9" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."auth" DROP CONSTRAINT "FK_b2c7c54baac51f7ca4f2cb313c9"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."auth" DROP CONSTRAINT "UQ_b2c7c54baac51f7ca4f2cb313c9"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."auth" ADD CONSTRAINT "FK_b2c7c54baac51f7ca4f2cb313c9" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP COLUMN "strava_activity_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" ADD "workout_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" ADD "user_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."activity" ADD "user_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" ADD CONSTRAINT "FK_36054a123923149bba7f5418aeb" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" ADD CONSTRAINT "FK_69f240d8e39f99bb74778e53094" FOREIGN KEY ("workout_id") REFERENCES "workout"("worktout_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."activity" ADD CONSTRAINT "FK_b8419e7468648e67adbdfc5ffdd" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
