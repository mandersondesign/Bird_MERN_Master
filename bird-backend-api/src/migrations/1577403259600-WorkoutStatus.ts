import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutStatus1577403259600 implements MigrationInterface {
    name = 'WorkoutStatus1577403259600'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "plan"."workout_status" ("workout_status_id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_382060dfe20cb7a5f36f013b38e" UNIQUE ("name"), CONSTRAINT "PK_243da43af570495538468a9ab24" PRIMARY KEY ("workout_status_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD "workout_status_id" integer`, undefined);

        await queryRunner.query(`
            INSERT INTO "plan"."workout_status"(workout_status_id, name) VALUES
            (1, 'No results'),
            (2, 'Did it'), 
            (3, 'Did not do it');
        `);

        await queryRunner.query(`UPDATE "plan"."workout" SET workout_status_id=1`);
        await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "workout_status_id" SET DEFAULT 1`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "workout_status_id" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP COLUMN "workout_status_id"`, undefined);
        await queryRunner.query(`DROP TABLE "plan"."workout_status"`, undefined);
    }

}
