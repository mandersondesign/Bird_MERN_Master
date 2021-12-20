import {MigrationInterface, QueryRunner} from "typeorm";

export class workoutDistance1576753144840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const sql = `
            ALTER TABLE plan.workout_template ALTER COLUMN distance TYPE numeric(5,3);
            COMMENT ON COLUMN plan.workout_template.distance IS 'Distance in miles';
            ALTER TABLE plan.workout ALTER COLUMN distance TYPE numeric(5,3);
        `;
        await queryRunner.query(sql);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const sql = `
            ALTER TABLE plan.workout_template ALTER COLUMN distance TYPE integer;
            ALTER TABLE plan.workout ALTER COLUMN distance TYPE integer;
        `;
        await queryRunner.query(sql);
    }

}
