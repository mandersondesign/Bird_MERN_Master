import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutTime1606199729697 implements MigrationInterface {
    name = 'WorkoutTime1606199729697'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD "time" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout_template" ADD "time" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout_library" ADD "time" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout_library" DROP COLUMN "time"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout_template" DROP COLUMN "time"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP COLUMN "time"`, undefined);
    }

}
