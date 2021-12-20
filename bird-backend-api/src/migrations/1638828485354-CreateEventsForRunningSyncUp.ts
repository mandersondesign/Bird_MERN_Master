import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEventsForRunningSyncUp1638828485354 implements MigrationInterface {
    name = 'CreateEventsForRunningSyncUp1638828485354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "runsignup"."race" ADD "events" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "runsignup"."race" DROP COLUMN "events"`);
    }

}
