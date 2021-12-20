import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutLibraryName1596054142560 implements MigrationInterface {
    name = 'WorkoutLibraryName1596054142560'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout_library" DROP COLUMN "library_name"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout_library" ADD "library_name" character varying NOT NULL`, undefined);
    }

}
