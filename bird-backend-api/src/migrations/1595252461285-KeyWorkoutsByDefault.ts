import {MigrationInterface, QueryRunner} from "typeorm";

export class KeyWorkoutsByDefault1595252461285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE "plan"."workout" SET is_marked_as_key=false`);
        await queryRunner.query(`UPDATE "plan"."workout" SET is_marked_as_key=true WHERE workout_type_id <= 3`); // speed, tempo, long run
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
