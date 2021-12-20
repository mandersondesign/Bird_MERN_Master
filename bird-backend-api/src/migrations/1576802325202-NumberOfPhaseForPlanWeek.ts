import {MigrationInterface, QueryRunner} from "typeorm";

export class NumberOfPhaseForPlanWeek1576802325202 implements MigrationInterface {
    name = 'NumberOfPhaseForPlanWeek1576802325202'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_week" ADD "number_of_phase" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_week" DROP COLUMN "number_of_phase"`, undefined);
    }

}
