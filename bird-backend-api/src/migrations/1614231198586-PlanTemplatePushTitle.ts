import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanTemplatePushTitle1614231198586 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" ADD "push_title" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_template" DROP COLUMN "push_title"`, undefined);
    }

}
