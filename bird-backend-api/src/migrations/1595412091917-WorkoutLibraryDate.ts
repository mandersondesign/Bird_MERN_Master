import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutLibraryDate1595412091917 implements MigrationInterface {
    name = 'WorkoutLibraryDate1595412091917'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout_library" ADD "last_update" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout_library" DROP COLUMN "last_update"`, undefined);
    }

}
