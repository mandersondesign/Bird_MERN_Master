import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanTemplatePhases1576576721501 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO "plan"."phase"(phase_id, name) VALUES
            (1, 'Build a Base'),
            (2, 'Develop Speed'),
            (3, 'Recovery'),
            (4, 'Tackle Hills'),
            (5, 'Grow Endurance'),
            (6, 'Peak'),
            (7, 'Fine Tuning'),
            (8, 'Taper'),
            (9, 'Race');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
