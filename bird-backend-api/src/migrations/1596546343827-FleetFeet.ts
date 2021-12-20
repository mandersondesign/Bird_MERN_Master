import {MigrationInterface, QueryRunner} from "typeorm";

export class FleetFeet1596546343827 implements MigrationInterface {
    name = 'FleetFeet1596546343827'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createSchema('fleetfeet');
        await queryRunner.query(`CREATE TABLE "fleetfeet"."event" ("event_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(5,2), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_b520e272689459221f485efe12a" PRIMARY KEY ("event_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "fleetfeet"."survey_question" ("survey_question_id" integer NOT NULL, "question" character varying NOT NULL, "options" text array, CONSTRAINT "PK_8fba060ae314c51909b9fd35425" PRIMARY KEY ("survey_question_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "fleetfeet"."survey_answer" ("survey_answer_id" integer NOT NULL, "user_id" integer NOT NULL, "survey_question_id" integer NOT NULL, "answer" character varying, CONSTRAINT "REL_4f07737a247004b8d7249c6251" UNIQUE ("user_id"), CONSTRAINT "REL_bd8925de0a07b3aaf3bd040144" UNIQUE ("survey_question_id"), CONSTRAINT "PK_d89e47b74ff1b83e0c9cf30d0e0" PRIMARY KEY ("survey_answer_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" ADD CONSTRAINT "FK_4f07737a247004b8d7249c6251f" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" ADD CONSTRAINT "FK_bd8925de0a07b3aaf3bd0401440" FOREIGN KEY ("survey_question_id") REFERENCES "fleetfeet"."survey_question"("survey_question_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" DROP CONSTRAINT "FK_bd8925de0a07b3aaf3bd0401440"`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_answer" DROP CONSTRAINT "FK_4f07737a247004b8d7249c6251f"`, undefined);
        await queryRunner.query(`DROP TABLE "fleetfeet"."survey_answer"`, undefined);
        await queryRunner.query(`DROP TABLE "fleetfeet"."survey_question"`, undefined);
        await queryRunner.query(`DROP TABLE "fleetfeet"."event"`, undefined);
        await queryRunner.dropSchema('fleetfeet');
    }

}
