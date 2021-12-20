import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutType1594564005807 implements MigrationInterface {
    name = 'WorkoutType1594564005807'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout_type" ADD "coach_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout_type" DROP CONSTRAINT "workout_type_name_key"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout_type" ADD CONSTRAINT "FK_7bf579e5ad867fb91188444560c" FOREIGN KEY ("coach_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout_type" DROP CONSTRAINT "FK_7bf579e5ad867fb91188444560c"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout_type" ADD CONSTRAINT "workout_type_name_key" UNIQUE ("name")`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout_type" DROP COLUMN "coach_id"`, undefined);
    }

}
