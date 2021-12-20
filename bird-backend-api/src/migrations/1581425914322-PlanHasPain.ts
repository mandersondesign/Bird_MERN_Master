import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanHasPain1581425914322 implements MigrationInterface {
    name = 'PlanHasPain1581425914322'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" ADD "has_pain" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" DROP COLUMN "has_pain"`);
    }

}
