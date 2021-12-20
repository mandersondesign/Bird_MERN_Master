import {MigrationInterface, QueryRunner} from "typeorm";

export class StravaActivityBigint1600405969075 implements MigrationInterface {
    name = 'StravaActivityBigint1600405969075'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."activity" DROP CONSTRAINT "PK_6f6411b6e448b1d576105f4be62"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."activity" DROP COLUMN "activity_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."activity" ADD "activity_id" bigint NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."activity" ADD CONSTRAINT "PK_6f6411b6e448b1d576105f4be62" PRIMARY KEY ("activity_id")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."activity" DROP CONSTRAINT "PK_6f6411b6e448b1d576105f4be62"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."activity" DROP COLUMN "activity_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."activity" ADD "activity_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."activity" ADD CONSTRAINT "PK_6f6411b6e448b1d576105f4be62" PRIMARY KEY ("activity_id")`, undefined);
    }

}
