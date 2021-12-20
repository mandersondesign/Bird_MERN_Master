import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCheckConstraint1576749539737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE plan.plan_week_template DROP CONSTRAINT plan_week_template_number_of_week_check;`);
        await queryRunner.query(`ALTER TABLE plan.plan_week DROP CONSTRAINT plan_week_number_of_week_check;`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
