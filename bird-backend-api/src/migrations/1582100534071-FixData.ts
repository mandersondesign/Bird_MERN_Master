import {MigrationInterface, QueryRunner} from "typeorm";

export class FixData1582100534071 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE "event"."event" SET is_only_for_paid=true WHERE event_id=3`);

        await queryRunner.query(`DELETE FROM "plan"."pace"`);
        await queryRunner.query(`
            INSERT INTO "plan"."pace"(pace_id, name) VALUES
            (1, 'Race Pace'),
            (2, 'Tempo'),
            (3, 'Long Run'),
            (4, 'Mile'),
            (5, '200m'),
            (6, '400m'),
            (7, '800m');
        `);

        await queryRunner.query(`DELETE FROM "plan"."phase"`);
        await queryRunner.query(`
            INSERT INTO plan.phase (phase_id, name, description) VALUES (1, 'Build a Base', 'This phase builds on the foundation you bring to the plan and develops habits that you''ll use during training. You should feel comfortable running the first week''s long run, which will increase in mileage slowly.');
            INSERT INTO plan.phase (phase_id, name, description) VALUES (2, 'Develop Speed', 'Speed work makes you more efficient by improving your running economy (the amount of oxygen you consume) and training your muscles to handle lactic acid when you''re working hard.');
            INSERT INTO plan.phase (phase_id, name, description) VALUES (4, 'Tackle Hills', 'Hill work is important, even if your race is flat. Hills improve your leg power, endurance, anaerobic capacity, speed, and cadence.');
            INSERT INTO plan.phase (phase_id, name, description) VALUES (5, 'Grow Endurance', 'Weekly mileage is longer and workouts are more intense, to prepare you mentally and physically for the last part of your race.');
            INSERT INTO plan.phase (phase_id, name, description) VALUES (7, 'Fine Tuning', 'By now you feel dialed into your training.  This is the time to practice and adjust any parts of your plan and feel confident that you''re ready to race.');
            INSERT INTO plan.phase (phase_id, name, description) VALUES (8, 'Taper & Race', 'Now''s the time you trust the work you have put in and mentally prepare for race day! Lower milage will allow you to prioritize sleep, hydration, nutrition, and recovery.');
        `);

        await queryRunner.query(`DELETE FROM "plan"."workout_type"`);
        await queryRunner.query(`
            INSERT INTO "plan"."workout_type"(workout_type_id, name) VALUES
            (1, 'Tempo'),
            (2, 'Speed'),
            (3, 'Long Run'),
            (5, 'Recovery'),
            (6, 'Cross Training'),
            (7, 'Benchmark'),
            (8, 'Rest'),
            (9, 'Race Pace');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
