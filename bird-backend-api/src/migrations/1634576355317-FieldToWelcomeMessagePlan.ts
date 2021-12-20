import {MigrationInterface, QueryRunner} from "typeorm";

export class FieldToWelcomeMessagePlan1634576355317 implements MigrationInterface {
    name = 'FieldToWelcomeMessagePlan1634576355317';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" ADD "scheduled_message" character varying`);
        await queryRunner.query(`ALTER TABLE "plan"."plan" ADD "scheduled_message" character varying`);
        await queryRunner.query(`ALTER TABLE "plan"."plan" ADD "message_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "plan"."plan" ADD "message_sent" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" DROP COLUMN "message_sent"`);
        await queryRunner.query(`ALTER TABLE "plan"."plan" DROP COLUMN "message_date"`);
        await queryRunner.query(`ALTER TABLE "plan"."plan" DROP COLUMN "scheduled_message"`);
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" DROP COLUMN "scheduled_message"`);
    }

}
