import {MigrationInterface, QueryRunner} from "typeorm";

export class ParticipantRegistrationIdInteger1623184793726 implements MigrationInterface {
    name = 'ParticipantRegistrationIdInteger1623184793726'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "runsignup"."participant" DROP COLUMN "registration_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "runsignup"."participant" ADD "registration_id" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "runsignup"."participant" DROP COLUMN "registration_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "runsignup"."participant" ADD "registration_id" character varying`, undefined);
    }

}
