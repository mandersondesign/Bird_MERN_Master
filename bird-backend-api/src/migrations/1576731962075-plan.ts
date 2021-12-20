import {MigrationInterface, QueryRunner} from "typeorm";

export class plan1576731962075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const sql = `
            CREATE TABLE plan.plan
            (
              plan_id serial NOT NULL, -- PK
              plan_template_id integer NOT NULL, -- Parent Template
              name character varying NOT NULL, -- Plan Name
              event_id integer NOT NULL, -- Event ID
              is_active boolean NOT NULL DEFAULT true, -- Active flag
              coach_id integer NOT NULL, -- Coach ID
              athlete_id integer NOT NULL, -- Athlete ID
              CONSTRAINT plan_pkey PRIMARY KEY (plan_id),
              CONSTRAINT plan_athlete_id_fkey FOREIGN KEY (athlete_id)
                  REFERENCES "user"."user" (user_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION,
              CONSTRAINT plan_coach_id_fkey FOREIGN KEY (coach_id)
                  REFERENCES "user"."user" (user_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION,
              CONSTRAINT plan_event_id_fkey FOREIGN KEY (event_id)
                  REFERENCES event.event (event_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION,
              CONSTRAINT plan_plan_template_id_fkey FOREIGN KEY (plan_template_id)
                  REFERENCES plan.plan_template (plan_template_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            COMMENT ON TABLE plan.plan
              IS 'Athlete Plans';
            COMMENT ON COLUMN plan.plan.plan_id IS 'PK';
            COMMENT ON COLUMN plan.plan.plan_template_id IS 'Parent Template';
            COMMENT ON COLUMN plan.plan.name IS 'Plan Name';
            COMMENT ON COLUMN plan.plan.event_id IS 'Event ID';
            COMMENT ON COLUMN plan.plan.is_active IS 'Active flag';
            COMMENT ON COLUMN plan.plan.coach_id IS 'Coach ID';
            COMMENT ON COLUMN plan.plan.athlete_id IS 'Athlete ID';

            ALTER TABLE plan.plan_week_template ADD CHECK (number_of_week >= 1 AND number_of_week <= 7);

            CREATE TABLE plan.plan_week
            (
                plan_week_id serial NOT NULL, -- PK
                plan_id integer NOT NULL, -- Plan ID
                phase_id integer NOT NULL, -- Phase
                number_of_week integer NOT NULL, -- Number of week
                description character varying NOT NULL DEFAULT ''::character varying, -- Description
                CONSTRAINT plan_week_pkey PRIMARY KEY (plan_week_id),
                CONSTRAINT plan_week_phase_id_fkey FOREIGN KEY (phase_id)
                    REFERENCES plan.phase (phase_id) MATCH SIMPLE
                    ON UPDATE NO ACTION ON DELETE NO ACTION,
                CONSTRAINT plan_week_plan_id_fkey FOREIGN KEY (plan_id)
                    REFERENCES plan.plan (plan_id) MATCH SIMPLE
                    ON UPDATE NO ACTION ON DELETE NO ACTION,
                CONSTRAINT plan_week_number_of_week_check CHECK (number_of_week >= 1 AND number_of_week <= 7)
            );
            COMMENT ON TABLE plan.plan_week IS 'Plan Week';
            COMMENT ON COLUMN plan.plan_week.plan_week_id IS 'PK';
            COMMENT ON COLUMN plan.plan_week.plan_id IS 'Plan ID';
            COMMENT ON COLUMN plan.plan_week.phase_id IS 'Phase';
            COMMENT ON COLUMN plan.plan_week.number_of_week IS 'Number of week';
            COMMENT ON COLUMN plan.plan_week.description IS 'Description';

            ALTER TABLE plan.workout_template DROP COLUMN week_id;

            CREATE TABLE plan.pace
            (
                pace_id serial NOT NULL, -- PK
                name character varying NOT NULL, -- Name
                description character varying NOT NULL DEFAULT ''::character varying, -- Description
                coach_id integer, -- Coach ID. If null it is system Pace
                created_at timestamp(0) without time zone NOT NULL DEFAULT now(), -- Creating time
                CONSTRAINT pace_pkey PRIMARY KEY (pace_id),
                CONSTRAINT pace_coach_id_fkey FOREIGN KEY (coach_id)
                    REFERENCES "user"."user" (user_id) MATCH SIMPLE
                    ON UPDATE NO ACTION ON DELETE NO ACTION
            );
            COMMENT ON TABLE plan.pace
                IS 'Paces';
            COMMENT ON COLUMN plan.pace.pace_id IS 'PK';
            COMMENT ON COLUMN plan.pace.name IS 'Name';
            COMMENT ON COLUMN plan.pace.description IS 'Description';
            COMMENT ON COLUMN plan.pace.coach_id IS 'Coach ID. If null it is system Pace';
            COMMENT ON COLUMN plan.pace.created_at IS 'Creating time';

            CREATE TABLE plan.workout
            (
                worktout_id serial NOT NULL, -- PK
                workout_template_id integer NOT NULL, -- Workout Template
                plan_week_id integer NOT NULL, -- Plan Week ID
                name character varying NOT NULL, -- Name
                workout_type_id integer NOT NULL, -- Workout Type
                description character varying NOT NULL DEFAULT ''::character varying, -- Description
                distance integer NOT NULL, -- Distance in miles
                pace_id integer NOT NULL, -- Pace
                date date NOT NULL, -- Date of workout
                CONSTRAINT workout_pkey PRIMARY KEY (worktout_id),
                CONSTRAINT workout_pace_id_fkey FOREIGN KEY (pace_id)
                    REFERENCES plan.pace (pace_id) MATCH SIMPLE
                    ON UPDATE NO ACTION ON DELETE NO ACTION,
                CONSTRAINT workout_plan_week_id_fkey FOREIGN KEY (plan_week_id)
                    REFERENCES plan.plan_week (plan_week_id) MATCH SIMPLE
                    ON UPDATE NO ACTION ON DELETE NO ACTION,
                CONSTRAINT workout_workout_template_id_fkey FOREIGN KEY (workout_template_id)
                    REFERENCES plan.workout_template (workout_template_id) MATCH SIMPLE
                    ON UPDATE NO ACTION ON DELETE NO ACTION,
                CONSTRAINT workout_workout_type_id_fkey FOREIGN KEY (workout_type_id)
                    REFERENCES plan.workout_type (workout_type_id) MATCH SIMPLE
                    ON UPDATE NO ACTION ON DELETE NO ACTION
            );
            COMMENT ON TABLE plan.workout IS 'Workouts';
            COMMENT ON COLUMN plan.workout.worktout_id IS 'PK';
            COMMENT ON COLUMN plan.workout.workout_template_id IS 'Workout Template';
            COMMENT ON COLUMN plan.workout.plan_week_id IS 'Plan Week ID';
            COMMENT ON COLUMN plan.workout.name IS 'Name';
            COMMENT ON COLUMN plan.workout.workout_type_id IS 'Workout Type';
            COMMENT ON COLUMN plan.workout.description IS 'Description';
            COMMENT ON COLUMN plan.workout.distance IS 'Distance in miles';
            COMMENT ON COLUMN plan.workout.pace_id IS 'Pace';
            COMMENT ON COLUMN plan.workout.date IS 'Date of workout';
        `;

        await queryRunner.query(sql);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('plan.workout');
        await queryRunner.dropTable('plan.pace');
        await queryRunner.dropTable('plan.plan_week');
        await queryRunner.query(`ALTER TABLE plan.plan_week_template DROP CONSTRAINT plan_week_template_number_of_week_check;`);
        await queryRunner.dropTable('plan.plan');
    }

}
