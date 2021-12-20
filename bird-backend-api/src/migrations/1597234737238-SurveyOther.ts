import {MigrationInterface, QueryRunner} from "typeorm";

export class SurveyOther1597234737238 implements MigrationInterface {
    name = 'SurveyOther1597234737238'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_question" ADD "has_other" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_question" DROP COLUMN "has_other"`, undefined);
    }

}
