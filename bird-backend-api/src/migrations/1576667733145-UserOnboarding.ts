import {MigrationInterface, QueryRunner} from "typeorm";

export class UserOnboarding1576667733145 implements MigrationInterface {
    name = 'UserOnboarding1576667733145'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "plan_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "goal_type" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "current_10k_record" TIME`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "current_half_marathon_record" TIME`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "current_marathon_record" TIME`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "event_id" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "event_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "current_marathon_record"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "current_half_marathon_record"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "current_10k_record"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "goal_type"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "plan_id" integer`, undefined);
    }

}
