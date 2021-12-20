import {MigrationInterface, QueryRunner} from "typeorm";

export class StravaSplitWorkoutId1600859065510 implements MigrationInterface {
    name = 'StravaSplitWorkoutId1600859065510'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."split" ALTER COLUMN "workout_id" DROP NOT NULL`, undefined);
        }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "strava"."split" ALTER COLUMN "workout_id" SET NOT NULL`, undefined);
    }

}
