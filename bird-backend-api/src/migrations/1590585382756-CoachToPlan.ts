import {MigrationInterface, QueryRunner} from "typeorm";

export class CoachToPlan1590585382756 implements MigrationInterface {
    name = 'CoachToPlan1590585382756'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE SEQUENCE "subscription"."coach_plan_to_user_coach_plan_to_user_id_seq" OWNED BY "subscription"."coach_plan_to_user"."coach_plan_to_user_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."coach_plan_to_user" ALTER COLUMN "coach_plan_to_user_id" SET DEFAULT nextval('subscription.coach_plan_to_user_coach_plan_to_user_id_seq')`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription"."coach_plan_to_user" ALTER COLUMN "coach_plan_to_user_id" DROP DEFAULT`, undefined);
        await queryRunner.query(`DROP SEQUENCE "subscription"."coach_plan_to_user_coach_plan_to_user_id_seq"`, undefined);
    }

}
