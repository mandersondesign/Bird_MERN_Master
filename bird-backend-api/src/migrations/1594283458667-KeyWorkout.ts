import {MigrationInterface, QueryRunner} from "typeorm";

export class KeyWorkout1594283458667 implements MigrationInterface {
    name = 'KeyWorkout1594283458667'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" ADD "is_marked_as_key" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."workout" DROP COLUMN "is_marked_as_key"`, undefined);
    }

}
