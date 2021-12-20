import {MigrationInterface, QueryRunner} from "typeorm";

export class SurveyAnswerUniq1597670962839 implements MigrationInterface {
    name = 'SurveyAnswerUniq1597670962839'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" DROP CONSTRAINT "FK_4f07737a247004b8d7249c6251f"`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" DROP CONSTRAINT "FK_bd8925de0a07b3aaf3bd0401440"`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" DROP CONSTRAINT "REL_4f07737a247004b8d7249c6251"`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" DROP CONSTRAINT "REL_bd8925de0a07b3aaf3bd040144"`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" ADD CONSTRAINT "FK_4f07737a247004b8d7249c6251f" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" ADD CONSTRAINT "FK_bd8925de0a07b3aaf3bd0401440" FOREIGN KEY ("survey_question_id") REFERENCES "fleetfeet"."survey_question"("survey_question_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" DROP CONSTRAINT "FK_bd8925de0a07b3aaf3bd0401440"`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" DROP CONSTRAINT "FK_4f07737a247004b8d7249c6251f"`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" ADD CONSTRAINT "REL_bd8925de0a07b3aaf3bd040144" UNIQUE ("survey_question_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" ADD CONSTRAINT "REL_4f07737a247004b8d7249c6251" UNIQUE ("user_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" ADD CONSTRAINT "FK_bd8925de0a07b3aaf3bd0401440" FOREIGN KEY ("survey_question_id") REFERENCES "survey_question"("survey_question_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" ADD CONSTRAINT "FK_4f07737a247004b8d7249c6251f" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
