import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkoutPace1602237285049 implements MigrationInterface {
	name = 'WorkoutPace1602237285049'

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "avg_pace" TYPE numeric`, undefined);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`ALTER TABLE "plan"."workout" ALTER COLUMN "avg_pace" TYPE numeric(5,3)`, undefined);
	}

}
