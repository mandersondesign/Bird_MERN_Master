import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutStatus1580414213579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO "plan"."workout_status"(workout_status_id, name) VALUES
            (4, 'Partially done');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
