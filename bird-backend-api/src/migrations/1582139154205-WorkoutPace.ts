import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutPace1582139154205 implements MigrationInterface {
    name = 'WorkoutPace1582139154205'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "pace_id" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "pace_id" SET NOT NULL`, undefined);
    }

}
