import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanPublishDate1581333205271 implements MigrationInterface {
    name = 'PlanPublishDate1581333205271'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" ADD "publish_date" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" DROP COLUMN "publish_date"`);
    }

}
