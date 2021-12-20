import {MigrationInterface, QueryRunner} from "typeorm";

export class SubscriptionPlanPrice1590522032683 implements MigrationInterface {
    name = 'SubscriptionPlanPrice1590522032683'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription"."coach_plan" ADD "price" numeric(5,2)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription"."coach_plan" DROP COLUMN "price"`, undefined);
    }

}
