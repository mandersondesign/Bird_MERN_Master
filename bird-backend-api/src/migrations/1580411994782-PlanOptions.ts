import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanOptions1580411994782 implements MigrationInterface {
    name = 'PlanOptions1580411994782'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" ADD "min" numeric(5,3)`);
        await queryRunner.query(`ALTER TABLE "plan"."plan" ADD "max" numeric(5,3)`);
        await queryRunner.query(`ALTER TABLE "plan"."plan" ADD "start_date" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "plan"."plan" DROP COLUMN "max"`);
        await queryRunner.query(`ALTER TABLE "plan"."plan" DROP COLUMN "min"`);
    }

}
