import {MigrationInterface, QueryRunner} from "typeorm";

export class SubscriptionPlanTrialDays1593423483089 implements MigrationInterface {
    name = 'SubscriptionPlanTrialDays1593423483089'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription"."coach_plan" ADD "trial_days" integer`);
        await queryRunner.query(`UPDATE "subscription"."coach_plan" SET trial_days=90 WHERE coach_plan_id=2`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription"."coach_plan" DROP COLUMN "trial_days"`);
    }

}
