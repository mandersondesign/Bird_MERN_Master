import {MigrationInterface, QueryRunner} from "typeorm";

export class AthleteSubscription1612417463772 implements MigrationInterface {
    name = 'AthleteSubscription1612417463772'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "subscription"."athlete_plan" ("athlete_plan_id" SERIAL NOT NULL, "coach_id" integer NOT NULL, "stripe_plan_id" character varying, "name" character varying NOT NULL, "price" numeric(5,2), CONSTRAINT "PK_9dcacd8e5b11c6ecf7d86051142" PRIMARY KEY ("athlete_plan_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "subscription"."athlete_plan_to_user" ("athlete_plan_to_user_id" SERIAL NOT NULL, "athlete_id" integer NOT NULL, "athlete_plan_id" integer NOT NULL, "start_date" TIMESTAMP NOT NULL DEFAULT now(), "paid_to_date" TIMESTAMP, "error_message" character varying, CONSTRAINT "PK_ed77c2f68cb4ae0389a904b5a3f" PRIMARY KEY ("athlete_plan_to_user_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "subscription"."athlete_to_stripe_subscription" ("athlete_to_stripe_subscription_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "athlete_plan_to_user_id" integer NOT NULL, "stripe_subscription_id" character varying, "subscription_end" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_c1566f771027be440706a14a2aa" PRIMARY KEY ("athlete_to_stripe_subscription_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."athlete_plan" ADD CONSTRAINT "FK_11593a22cc55627459b7e3e70eb" FOREIGN KEY ("coach_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."athlete_plan_to_user" ADD CONSTRAINT "FK_c290108631055d41d80dd75f970" FOREIGN KEY ("athlete_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."athlete_plan_to_user" ADD CONSTRAINT "FK_1c2a173d109f276e508d344f501" FOREIGN KEY ("athlete_plan_id") REFERENCES "subscription"."athlete_plan"("athlete_plan_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."athlete_to_stripe_subscription" ADD CONSTRAINT "FK_12b5b9d20115a726ec1895bdfe4" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."athlete_to_stripe_subscription" ADD CONSTRAINT "FK_351fc971a2b5dae72685ff6080f" FOREIGN KEY ("athlete_plan_to_user_id") REFERENCES "subscription"."athlete_plan_to_user"("athlete_plan_to_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
}

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription"."athlete_to_stripe_subscription" DROP CONSTRAINT "FK_351fc971a2b5dae72685ff6080f"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."athlete_to_stripe_subscription" DROP CONSTRAINT "FK_12b5b9d20115a726ec1895bdfe4"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."athlete_plan_to_user" DROP CONSTRAINT "FK_1c2a173d109f276e508d344f501"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."athlete_plan_to_user" DROP CONSTRAINT "FK_c290108631055d41d80dd75f970"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."athlete_plan" DROP CONSTRAINT "FK_11593a22cc55627459b7e3e70eb"`, undefined);
        await queryRunner.query(`DROP TABLE "subscription"."athlete_to_stripe_subscription"`, undefined);
        await queryRunner.query(`DROP TABLE "subscription"."athlete_plan_to_user"`, undefined);
        await queryRunner.query(`DROP TABLE "subscription"."athlete_plan"`, undefined);
    }

}
