import {MigrationInterface, QueryRunner} from "typeorm";

export class StravaRefacroting21603096723744 implements MigrationInterface {
    name = 'StravaRefacroting21603096723744'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."auth" DROP COLUMN "refresh_token"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."auth" DROP COLUMN "access_token"`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."auth" DROP COLUMN "expires_at"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."auth" ADD "expires_at" TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."auth" ADD "access_token" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."auth" ADD "refresh_token" character varying NOT NULL`, undefined);
    }

}
