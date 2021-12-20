import {MigrationInterface, QueryRunner} from "typeorm";

export class plans1576493289884 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const sql = `
            CREATE SCHEMA plan;
            COMMENT ON SCHEMA plan IS 'Workout Plans';
            
            CREATE TABLE plan.workout_type
            (
              workout_type_id serial NOT NULL, -- PK
              name character varying NOT NULL, -- Workout Type Name
              CONSTRAINT workout_type_pkey PRIMARY KEY (workout_type_id),
              CONSTRAINT workout_type_name_key UNIQUE (name)
            );

            COMMENT ON TABLE plan.workout_type IS 'Workout Types';
            COMMENT ON COLUMN plan.workout_type.workout_type_id IS 'PK';
            COMMENT ON COLUMN plan.workout_type.name IS 'Workout Type Name';
            
            CREATE TABLE plan.workout_template
            (
              workout_template_id serial NOT NULL, -- PK
              name character varying NOT NULL, -- Workout Name
              workout_type_id integer NOT NULL, -- Workout Type ID
              week_id integer,
              day_number integer, -- 1 - Monday...
              description character varying NOT NULL DEFAULT ''::character varying, -- Desc
              pace_id integer, -- Pace ID
              distance integer,
              CONSTRAINT workout_template_pkey PRIMARY KEY (workout_template_id),
              CONSTRAINT workout_template_workout_type_id_fkey FOREIGN KEY (workout_type_id)
                  REFERENCES plan.workout_type (workout_type_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            COMMENT ON COLUMN plan.workout_template.workout_template_id IS 'PK';
            COMMENT ON COLUMN plan.workout_template.name IS 'Workout Name';
            COMMENT ON COLUMN plan.workout_template.workout_type_id IS 'Workout Type ID';
            COMMENT ON COLUMN plan.workout_template.day_number IS '1 - Monday, 7 - Sunday';
            COMMENT ON COLUMN plan.workout_template.description IS 'Desc';
            COMMENT ON COLUMN plan.workout_template.pace_id IS 'Pace ID';
            
            CREATE TABLE plan.phase
            (
              phase_id serial NOT NULL, -- PK
              name character varying NOT NULL, -- Phase name
              description character varying NOT NULL DEFAULT ''::character varying, -- Phase Description
              coach_id integer, -- Coach ID. Null if it is system Phase
              created_at timestamp(0) without time zone NOT NULL DEFAULT now(), -- Creating time
              CONSTRAINT phase_pkey PRIMARY KEY (phase_id),
              CONSTRAINT phase_coach_id_fkey FOREIGN KEY (coach_id)
                  REFERENCES "user"."user" (user_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION
            );
            
            COMMENT ON TABLE plan.phase IS 'Plan Phases';
            COMMENT ON COLUMN plan.phase.phase_id IS 'PK';
            COMMENT ON COLUMN plan.phase.name IS 'Phase name';
            COMMENT ON COLUMN plan.phase.description IS 'Phase Description';
            COMMENT ON COLUMN plan.phase.coach_id IS 'Coach ID. Null if it is system Phase';
            COMMENT ON COLUMN plan.phase.created_at IS 'Creating time';
            
            CREATE TABLE plan.plan_template
            (
              plan_template_id serial NOT NULL, -- PK
              name character varying NOT NULL, -- Name of plan
              event_id integer NOT NULL, -- Event ID
              coach_id integer, -- Coach ID
              CONSTRAINT plan_template_pkey PRIMARY KEY (plan_template_id),
              CONSTRAINT plan_template_coach_id_fkey FOREIGN KEY (coach_id)
                  REFERENCES "user"."user" (user_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION,
              CONSTRAINT plan_template_event_id_fkey FOREIGN KEY (event_id)
                  REFERENCES event.event (event_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            COMMENT ON TABLE plan.plan_template IS 'Template for plans';
            COMMENT ON COLUMN plan.plan_template.plan_template_id IS 'PK';
            COMMENT ON COLUMN plan.plan_template.name IS 'Name of plan';
            COMMENT ON COLUMN plan.plan_template.event_id IS 'Event ID';
            COMMENT ON COLUMN plan.plan_template.coach_id IS 'Coach ID';
            
            CREATE TABLE plan.phase_to_template
            (
              phase_to_template_id serial NOT NULL, -- PK
              phase_id integer NOT NULL, -- Phase ID
              plan_template_id integer NOT NULL, -- Plan Template ID
              CONSTRAINT phase_to_template_pkey PRIMARY KEY (phase_to_template_id),
              CONSTRAINT phase_to_template_phase_id_fkey FOREIGN KEY (phase_id)
                  REFERENCES plan.phase (phase_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION,
              CONSTRAINT phase_to_template_plan_template_id_fkey FOREIGN KEY (plan_template_id)
                  REFERENCES plan.plan_template (plan_template_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            COMMENT ON TABLE plan.phase_to_template IS 'Relationship between phases and tempates';
            COMMENT ON COLUMN plan.phase_to_template.phase_to_template_id IS 'PK';
            COMMENT ON COLUMN plan.phase_to_template.phase_id IS 'Phase ID';
            COMMENT ON COLUMN plan.phase_to_template.plan_template_id IS 'Plan Template ID';
            
            CREATE TABLE plan.template_plan_week
            (
              template_plan_week_id serial NOT NULL, -- PK
              phase_template_id integer NOT NULL, -- Phase Template ID
              "number" integer NOT NULL, -- Number of week
              description character varying NOT NULL DEFAULT ''::character varying, -- Week Description
              phase_to_template_id integer NOT NULL, -- Link to Phase
              CONSTRAINT template_plan_week_pkey PRIMARY KEY (template_plan_week_id),
              CONSTRAINT template_plan_week_phase_to_template_id_fkey FOREIGN KEY (phase_to_template_id)
                  REFERENCES plan.phase_to_template (phase_to_template_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            COMMENT ON TABLE plan.template_plan_week IS 'Template Plan Weeks';
            COMMENT ON COLUMN plan.template_plan_week.template_plan_week_id IS 'PK';
            COMMENT ON COLUMN plan.template_plan_week.phase_template_id IS 'Phase Template ID';
            COMMENT ON COLUMN plan.template_plan_week."number" IS 'Number of week';
            COMMENT ON COLUMN plan.template_plan_week.description IS 'Week Description';
            COMMENT ON COLUMN plan.template_plan_week.phase_to_template_id IS 'Link to Phase';
        `;
        await queryRunner.query(sql);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP SCHEMA plan`);
    }

}
