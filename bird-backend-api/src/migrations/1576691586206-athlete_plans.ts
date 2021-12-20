import {MigrationInterface, QueryRunner} from "typeorm";

export class athletePlans1576691586206 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const sql = `
            ALTER TABLE plan.template_plan_week DROP CONSTRAINT template_plan_week_phase_to_template_id_fkey;
            DROP TABLE plan.phase_to_template;
            DROP TABLE plan.template_plan_week;
            
            CREATE TABLE plan.plan_week_template
            (
              plan_week_template_id serial NOT NULL, -- PK
              plan_template_id integer NOT NULL, -- Plan Template ID
              phase_id integer NOT NULL, -- Phase ID
              number_of_week integer, -- Number of week
              description character varying NOT NULL DEFAULT ''::character varying, -- Description
              CONSTRAINT plan_week_template_pkey PRIMARY KEY (plan_week_template_id),
              CONSTRAINT plan_week_template_phase_id_fkey FOREIGN KEY (phase_id)
                  REFERENCES plan.phase (phase_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION,
              CONSTRAINT plan_week_template_plan_template_id_fkey FOREIGN KEY (plan_template_id)
                  REFERENCES plan.plan_template (plan_template_id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            COMMENT ON TABLE plan.plan_week_template IS 'Templates for Weeks';
            COMMENT ON COLUMN plan.plan_week_template.plan_week_template_id IS 'PK';
            COMMENT ON COLUMN plan.plan_week_template.plan_template_id IS 'Plan Template ID';
            COMMENT ON COLUMN plan.plan_week_template.phase_id IS 'Phase ID';
            COMMENT ON COLUMN plan.plan_week_template.number_of_week IS 'Number of week';
            COMMENT ON COLUMN plan.plan_week_template.description IS 'Description';
            
            ALTER TABLE plan.workout_template ADD COLUMN plan_week_template_id integer NOT NULL;
            ALTER TABLE plan.workout_template ADD FOREIGN KEY (plan_week_template_id) REFERENCES plan.plan_week_template (plan_week_template_id) ON UPDATE NO ACTION ON DELETE NO ACTION;
        `;

        await queryRunner.query(sql);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('plan.plan_week_template');
    }

}
