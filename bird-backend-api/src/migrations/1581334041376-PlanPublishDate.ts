import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanPublishDate1581334041376 implements MigrationInterface {
    name = 'PlanPublishDate1581334041376'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" ALTER COLUMN "publish_date" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" ALTER COLUMN "publish_date" DROP DEFAULT`);
    }

}
