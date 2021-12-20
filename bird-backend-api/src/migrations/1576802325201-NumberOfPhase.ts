import {MigrationInterface, QueryRunner} from "typeorm";

export class NumberOfPhase1576802325201 implements MigrationInterface {
    name = 'NumberOfPhase1576802325201'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" ADD "number_of_phase" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_week_template" DROP COLUMN "number_of_phase"`, undefined);
    }

}
