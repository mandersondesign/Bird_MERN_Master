import {MigrationInterface, QueryRunner} from "typeorm";

export class FixData1582100534072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE "plan"."plan_template" SET name='10k' WHERE plan_template_id=6`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
