import {MigrationInterface, QueryRunner} from "typeorm";

export class UserInfoTime1575637999266 implements MigrationInterface {
    name = 'UserInfoTime1575637999266'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "goal_time"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "goal_time" TIME`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "current_5k_record"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "current_5k_record" TIME`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "current_5k_record"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "current_5k_record" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "goal_time"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "goal_time" integer`, undefined);
    }

}
