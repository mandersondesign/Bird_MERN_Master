import {MigrationInterface, QueryRunner} from "typeorm";

export class StripeCard1591215367486 implements MigrationInterface {
    name = 'StripeCard1591215367486'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "subscription"."stripe_card" ("stripe_card_id" SERIAL NOT NULL, "stripe_source_id" character varying, "stripe_customer_id" character varying, "brand" character varying, "fingerprint" character varying, "funding" character varying, "exp_month" integer, "exp_year" integer, "last4" integer, "user_id" integer, CONSTRAINT "PK_55b50433d08c91e727c5900769d" PRIMARY KEY ("stripe_card_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."stripe_card" ADD CONSTRAINT "FK_aafc8ba08fa8e9e9cfabf2470b5" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription"."stripe_card" DROP CONSTRAINT "FK_aafc8ba08fa8e9e9cfabf2470b5"`, undefined);
        await queryRunner.query(`DROP TABLE "subscription"."stripe_card"`, undefined);
    }

}
