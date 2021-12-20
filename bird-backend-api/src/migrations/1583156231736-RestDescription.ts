import {MigrationInterface, QueryRunner} from "typeorm";

export class RestDescription1583156231736 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE plan.workout_template set description='Recovery days are as important as training days! Take it easy today, do some light stretching, and rest up for your next workout.' where description ='' and workout_type_id=8`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
