import {MigrationInterface, QueryRunner} from "typeorm";

export class SurveyQuestionType1612325343737 implements MigrationInterface {
    name = 'SurveyQuestionType1612325343737'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_question" ADD "type" character varying NOT NULL DEFAULT 'radio'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_question" DROP COLUMN "type"`, undefined);
    }

}
