import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanEvent1584010879697 implements MigrationInterface {
    name = 'PlanEvent1584010879697'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" ALTER COLUMN "event_id" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" ALTER COLUMN "event_id" SET NOT NULL`, undefined);
    }

}
