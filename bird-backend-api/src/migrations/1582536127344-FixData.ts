import {MigrationInterface, QueryRunner} from "typeorm";

export class FixData1582536127344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE "plan"."plan_template" SET event_id=6 WHERE plan_template_id=6`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
