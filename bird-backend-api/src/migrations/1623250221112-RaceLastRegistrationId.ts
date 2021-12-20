import {MigrationInterface, QueryRunner} from "typeorm";

export class RaceLastRegistrationId1623250221112 implements MigrationInterface {
    name = 'RaceLastRegistrationId1623250221112'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "runsignup"."race" ADD "last_registration_id" integer NOT NULL DEFAULT 1`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "runsignup"."race" DROP COLUMN "last_registration_id"`, undefined);
    }

}
