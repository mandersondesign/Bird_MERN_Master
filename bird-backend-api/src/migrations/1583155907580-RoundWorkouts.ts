import {MigrationInterface, QueryRunner} from "typeorm";

export class RoundWorkouts1583155907580 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE plan.workout_template set distance=ROUND(distance) where distance % 1 != 0;`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
