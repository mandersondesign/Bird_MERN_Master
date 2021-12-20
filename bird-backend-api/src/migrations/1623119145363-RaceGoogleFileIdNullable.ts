import {MigrationInterface, QueryRunner} from "typeorm";

export class RaceGoogleFileIdNullable1623119145363 implements MigrationInterface {
    name = 'RaceGoogleFileIdNullable1623119145363'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "runsignup"."race" ALTER COLUMN "google_file_id" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "runsignup"."race" ALTER COLUMN "google_file_id" SET NOT NULL`, undefined);
    }

}
