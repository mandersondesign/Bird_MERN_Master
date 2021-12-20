import {MigrationInterface, QueryRunner} from "typeorm";

export class SurveyAnswerPK1597656763138 implements MigrationInterface {
    name = 'SurveyAnswerPK1597656763138'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE SEQUENCE "fleetfeet"."survey_answer_survey_answer_id_seq" OWNED BY "fleetfeet"."survey_answer"."survey_answer_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" ALTER COLUMN "survey_answer_id" SET DEFAULT nextval('fleetfeet.survey_answer_survey_answer_id_seq')`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" ALTER COLUMN "survey_answer_id" DROP DEFAULT`, undefined);
        await queryRunner.query(`DROP SEQUENCE "fleetfeet"."survey_answer_survey_answer_id_seq"`, undefined);
    }

}
