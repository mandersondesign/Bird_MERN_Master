import {MigrationInterface, QueryRunner} from "typeorm";

export class Stripe1591186205217 implements MigrationInterface {
    name = 'Stripe1591186205217'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "subscription"."user_to_stripe" ("user_to_stripe_id" SERIAL NOT NULL, "stripe_customer_id" character varying, "user_id" integer, CONSTRAINT "PK_d22f818c869f1f6348b963b3a0c" PRIMARY KEY ("user_to_stripe_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "subscription"."user_to_stripe_subscription" ("coach_to_stripe_subscription_id" SERIAL NOT NULL, "stripe_subscription_id" character varying, "subscription_end" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "user_id" integer, "coach_plan_to_user_id" integer, CONSTRAINT "PK_af689e1815bee23cd2f76474995" PRIMARY KEY ("coach_to_stripe_subscription_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."coach_plan" ADD "stripe_plan_id" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."user_to_stripe" ADD CONSTRAINT "FK_d66bc5097cdaecbe9dc29873b83" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."user_to_stripe_subscription" ADD CONSTRAINT "FK_9e361d581f726081592c21ce7f6" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."user_to_stripe_subscription" ADD CONSTRAINT "FK_6e26f2ea802d777b9e3e280d639" FOREIGN KEY ("coach_plan_to_user_id") REFERENCES "subscription"."coach_plan_to_user"("coach_plan_to_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription"."user_to_stripe_subscription" DROP CONSTRAINT "FK_6e26f2ea802d777b9e3e280d639"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."user_to_stripe_subscription" DROP CONSTRAINT "FK_9e361d581f726081592c21ce7f6"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."user_to_stripe" DROP CONSTRAINT "FK_d66bc5097cdaecbe9dc29873b83"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."coach_plan" DROP COLUMN "stripe_plan_id"`, undefined);
        await queryRunner.query(`DROP TABLE "subscription"."user_to_stripe_subscription"`, undefined);
        await queryRunner.query(`DROP TABLE "subscription"."user_to_stripe"`, undefined);
    }

}
