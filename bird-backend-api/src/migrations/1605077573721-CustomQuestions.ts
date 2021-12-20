import {MigrationInterface, QueryRunner} from "typeorm";

export class CustomQuestions1605077573721 implements MigrationInterface {
    name = 'CustomQuestions1605077573721'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."coach_info" ADD "custom_questions" text array`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "custom_questions" jsonb`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "custom_questions"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."coach_info" DROP COLUMN "custom_questions"`, undefined);
    }

}
