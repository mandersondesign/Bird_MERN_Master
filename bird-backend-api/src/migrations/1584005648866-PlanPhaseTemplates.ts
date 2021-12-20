import {MigrationInterface, QueryRunner} from "typeorm";

export class PlanPhaseTemplates1584005648866 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO plan.plan_phase_template (plan_phase_template_id, plan_template_id, name, description) VALUES (1, 1, 'Build a Base', 'This phase builds on the foundation you bring to the plan and develops habits that you''ll use during training. You should feel comfortable running the first week''s long run, which will increase in mileage slowly.');
            INSERT INTO plan.plan_phase_template (plan_phase_template_id, plan_template_id, name, description) VALUES (2, 1, 'Develop Speed', 'Speed work makes you more efficient by improving your running economy (the amount of oxygen you consume) and training your muscles to handle lactic acid when you''re working hard.');
            INSERT INTO plan.plan_phase_template (plan_phase_template_id, plan_template_id, name, description) VALUES (4, 1, 'Tackle Hills', 'Hill work is important, even if your race is flat. Hills improve your leg power, endurance, anaerobic capacity, speed, and cadence.');
            INSERT INTO plan.plan_phase_template (plan_phase_template_id, plan_template_id, name, description) VALUES (5, 1, 'Grow Endurance', 'Weekly mileage is longer and workouts are more intense, to prepare you mentally and physically for the last part of your race.');
            INSERT INTO plan.plan_phase_template (plan_phase_template_id, plan_template_id, name, description) VALUES (7, 1, 'Fine Tuning', 'By now you feel dialed into your training.  This is the time to practice and adjust any parts of your plan and feel confident that you''re ready to race.');
            INSERT INTO plan.plan_phase_template (plan_phase_template_id, plan_template_id, name, description) VALUES (8, 1, 'Taper & Race', 'Now''s the time you trust the work you have put in and mentally prepare for race day! Lower milage will allow you to prioritize sleep, hydration, nutrition, and recovery.');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "plan"."plan_phase_template"`);
    }

}
