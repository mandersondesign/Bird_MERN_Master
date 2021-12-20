import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutLibrary1594837511309 implements MigrationInterface {
    name = 'WorkoutLibrary1594837511309'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "plan"."workout_library" ("workout_library_id" SERIAL NOT NULL, "coach_id" integer NOT NULL, "library_name" character varying NOT NULL, "name" character varying, "workout_type_id" integer NOT NULL, "description" character varying NOT NULL DEFAULT '', "pace_id" integer, "distance" numeric(5,3), CONSTRAINT "PK_78520b01c5a03fa92053b174d35" PRIMARY KEY ("workout_library_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout_library" ADD CONSTRAINT "FK_19d628055db270505f93c6cb5a4" FOREIGN KEY ("coach_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout_library" ADD CONSTRAINT "FK_4aacd44353137b04df59cc89dc5" FOREIGN KEY ("workout_type_id") REFERENCES "plan"."workout_type"("workout_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout_library" DROP CONSTRAINT "FK_4aacd44353137b04df59cc89dc5"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout_library" DROP CONSTRAINT "FK_19d628055db270505f93c6cb5a4"`, undefined);
        await queryRunner.query(`DROP TABLE "plan"."workout_library"`, undefined);
    }

}
