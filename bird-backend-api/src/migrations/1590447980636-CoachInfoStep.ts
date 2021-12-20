import {MigrationInterface, QueryRunner} from "typeorm";

export class CoachInfoStep1590447980636 implements MigrationInterface {
    name = 'CoachInfoStep1590447980636'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."coach_info" ADD "onboarding_step" integer NOT NULL DEFAULT 1`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."coach_info" DROP COLUMN "onboarding_step"`, undefined);
    }

}
