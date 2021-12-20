import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanTemplatePhaseToTemplate1576576721502 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const HALF_MARATHON_BEG = 1;
        const HALF_MARATHON_ADV = 2;

        const MARATHON_BEG = 3;
        const MARATHON_INT = 4;
        const MARATHON_ADV = 5;

        const ULTRA_MARATHON = 6;

        // example
        // (1, 'Base'),
        // (2, 'Building Speed'),
        // (3, 'Fall Back/Recovery'),
        // (4, 'Building Hills'),
        // (5, 'Building Endurance'),
        // (6, 'Peak'),
        // (7, 'Fine Tuning'),
        // (8, 'Taper'),
        // (9, 'Race Week');

        await queryRunner.query(`
            INSERT INTO "plan"."phase_to_template"(phase_to_template_id, plan_template_id, phase_id) VALUES
            (1, ${HALF_MARATHON_BEG}, 1),
            (2, ${HALF_MARATHON_BEG}, 2),
            (3, ${HALF_MARATHON_BEG}, 3),
            (4, ${HALF_MARATHON_BEG}, 4),
            (5, ${HALF_MARATHON_BEG}, 5),
            (6, ${HALF_MARATHON_BEG}, 6),
            (7, ${HALF_MARATHON_BEG}, 7),
            (8, ${HALF_MARATHON_BEG}, 8),
            (9, ${HALF_MARATHON_BEG}, 9);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
