import {MigrationInterface, QueryRunner} from "typeorm";

export class StravaAccountName1602313816478 implements MigrationInterface {
    name = 'StravaAccountName1602313816478'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."auth" ADD "name" character varying NOT NULL DEFAULT 'Account Name'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."auth" DROP COLUMN "name"`, undefined);
    }

}
