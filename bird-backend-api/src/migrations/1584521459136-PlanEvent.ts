import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanEvent1584521459136 implements MigrationInterface {
    name = 'PlanEvent1584521459136'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" ALTER COLUMN "event_id" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" ALTER COLUMN "event_id" SET NOT NULL`, undefined);
    }

}
