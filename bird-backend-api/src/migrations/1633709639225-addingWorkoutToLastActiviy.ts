import {MigrationInterface, QueryRunner} from 'typeorm';

export class addingWorkoutToLastActiviy1633709639225 implements MigrationInterface {
    name = 'addingWorkoutToLastActiviy1633709639225';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."last_activity" ADD "worktout_id" integer`);
        await queryRunner.query(`ALTER TABLE "user"."last_activity" ADD CONSTRAINT "FK_3c09c7b70a3da88c1e3347f5b86" FOREIGN KEY ("worktout_id") REFERENCES "plan"."workout"("worktout_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
   
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."last_activity" DROP CONSTRAINT "FK_3c09c7b70a3da88c1e3347f5b86"`);
        await queryRunner.query(`ALTER TABLE "user"."last_activity" DROP COLUMN "worktout_id"`);
    }
}
