import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddingMessagesToWorkouts1632438200811 implements MigrationInterface {
    name = 'AddingMessagesToWorkouts1632438200811';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD "scheduled_message" character varying`);
        await queryRunner.query(`ALTER TABLE "plan"."workout_template" ADD "scheduled_message" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan"."workout_template" DROP COLUMN "scheduled_message"`);
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP COLUMN "scheduled_message"`);
    }

}
