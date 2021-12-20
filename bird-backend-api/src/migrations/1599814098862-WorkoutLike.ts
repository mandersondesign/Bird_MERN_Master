import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutLike1599814098862 implements MigrationInterface {
    name = 'WorkoutLike1599814098862'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD "is_liked" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP COLUMN "is_liked"`, undefined);
    }

}
