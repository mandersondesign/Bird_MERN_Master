import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutTemplateId1584558174463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`SELECT pg_catalog.setval('plan.workout_template_workout_template_id_seq', 1000, true);`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
