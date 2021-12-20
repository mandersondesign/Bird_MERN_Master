import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutHasResult1600694973658 implements MigrationInterface {
    name = 'WorkoutHasResult1600694973658'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD "has_result" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP COLUMN "has_result"`, undefined);
    }

}
