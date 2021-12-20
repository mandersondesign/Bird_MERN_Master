import {MigrationInterface, QueryRunner} from "typeorm";

export class OnboardingEventRaceName1604470795734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "race_name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "race_name"`);
    }

}
