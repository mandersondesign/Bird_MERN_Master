import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanTemplateData1576576721500 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO "plan"."plan_template"(plan_template_id, name, event_id) VALUES

            (1, 'Half Marathon Beginner Plan', 1),
            (2, 'Half Marathon Advanced Plan', 1),


            (3, 'Marathon Beginner Plan', 2),
            (4, 'Marathon Intermediate Plan', 2),
            (5, 'Marathon Advanced Plan', 2),

            (6, 'Ultra Marathon', 3);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
