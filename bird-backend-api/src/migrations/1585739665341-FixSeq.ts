import {MigrationInterface, QueryRunner} from "typeorm";

export class FixSeq1585739665341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`SELECT pg_catalog.setval('plan.plan_template_plan_template_id_seq', 10, true);`);
        await queryRunner.query(`SELECT pg_catalog.setval('plan.phase_phase_id_seq', 10, true);`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
