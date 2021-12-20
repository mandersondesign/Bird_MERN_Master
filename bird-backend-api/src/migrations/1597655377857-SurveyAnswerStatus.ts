import {MigrationInterface, QueryRunner} from "typeorm";

export class SurveyAnswerStatus1597655377857 implements MigrationInterface {
    name = 'SurveyAnswerStatus1597655377857'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" ADD "is_new" boolean NOT NULL DEFAULT true`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" DROP COLUMN "is_new"`, undefined);
    }

}
