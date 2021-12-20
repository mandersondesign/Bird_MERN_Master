import {MigrationInterface, QueryRunner} from "typeorm";

export class SubscriptionPlan1590521461794 implements MigrationInterface {
    name = 'SubscriptionPlan1590521461794'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createSchema('subscription');
        await queryRunner.query(`CREATE TABLE "subscription"."coach_plan" ("coach_plan_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "options" text array, "max_athletes" integer, "max_templates" integer, "is_active" boolean NOT NULL DEFAULT true, "is_public" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_9cfe0f242063066ceff286dcb57" PRIMARY KEY ("coach_plan_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "subscription"."coach_plan"`);
        await queryRunner.dropSchema('subscription');
    }

}
