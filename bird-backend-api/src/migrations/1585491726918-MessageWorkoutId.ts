import {MigrationInterface, QueryRunner} from "typeorm";

export class MessageWorkoutId1585491726918 implements MigrationInterface {
    name = 'MessageWorkoutId1585491726918'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."message" ADD "workout_id" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."message" DROP COLUMN "workout_id"`, undefined);
    }

}
