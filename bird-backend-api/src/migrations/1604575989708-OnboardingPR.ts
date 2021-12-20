import {MigrationInterface, QueryRunner} from "typeorm";

export class OnboardingPR1604575989708 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "personal_records" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "personal_records"`);
    }

}
