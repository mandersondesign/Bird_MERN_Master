import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanTemplateLastUpdate1584376315023 implements MigrationInterface {
    name = 'PlanTemplateLastUpdate1584376315023'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" DROP COLUMN "last_update"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" ADD "last_update" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" DROP COLUMN "last_update"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" ADD "last_update" date NOT NULL DEFAULT now()`, undefined);
    }

}
