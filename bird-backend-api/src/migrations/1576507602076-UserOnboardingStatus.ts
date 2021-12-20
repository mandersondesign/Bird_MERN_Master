import {MigrationInterface, QueryRunner} from "typeorm";

export class UserOnboardingStatus1576507602076 implements MigrationInterface {
    name = 'UserOnboardingStatus1576507602076'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "is_onboarding_completed" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "is_onboarding_completed"`, undefined);
    }

}
