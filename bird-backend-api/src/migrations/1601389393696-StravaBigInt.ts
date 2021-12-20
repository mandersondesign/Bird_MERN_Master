import {MigrationInterface, QueryRunner} from "typeorm";

export class StravaBigInt1601389393696 implements MigrationInterface {
    name = 'StravaBigInt1601389393696'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "moving_time" TYPE bigint`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "elapsed_time" TYPE bigint`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."activity" ALTER COLUMN "moving_time" TYPE bigint`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."activity" ALTER COLUMN "elapsed_time" TYPE bigint`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" ALTER COLUMN "moving_time" TYPE bigint`, undefined);
        await queryRunner.query(`ALTER TABLE "strava"."split" ALTER COLUMN "elapsed_time" TYPE bigint`, undefined);
        }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
