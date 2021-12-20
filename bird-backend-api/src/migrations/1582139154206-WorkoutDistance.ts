import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutDistance1582139154206 implements MigrationInterface {
    name = 'WorkoutDistance1582139154206'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "distance" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "distance" SET NOT NULL`, undefined);
    }

}
