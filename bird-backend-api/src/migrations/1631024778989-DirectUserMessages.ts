import { MigrationInterface, QueryRunner } from "typeorm";

export class DirectUserMessages1631024778989 implements MigrationInterface {
    name = 'DirectUserMessages1631024778989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan"."message" ADD "coach_id" integer`);
        await queryRunner.query(`ALTER TABLE "plan"."message" DROP CONSTRAINT "FK_47cfc7592bce0eb1b5de51402ef"`);
        await queryRunner.query(`ALTER TABLE "plan"."message" ALTER COLUMN "plan_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "plan"."message" DROP CONSTRAINT "FK_17c613f4653d2affa6052dda4e0"`);
        await queryRunner.query(`ALTER TABLE "plan"."message" ADD CONSTRAINT "FK_47cfc7592bce0eb1b5de51402ef" FOREIGN KEY ("plan_id") REFERENCES "plan"."plan"("plan_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plan"."message" ADD CONSTRAINT "FK_17c613f4653d2affa6052dda4e0" FOREIGN KEY ("workout_id") REFERENCES "plan"."workout"("worktout_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plan"."message" ADD CONSTRAINT "FK_5a438a7b91164cc1223de5e3962" FOREIGN KEY ("coach_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan"."message" DROP CONSTRAINT "FK_5a438a7b91164cc1223de5e3962"`);
        await queryRunner.query(`ALTER TABLE "plan"."message" DROP CONSTRAINT "FK_17c613f4653d2affa6052dda4e0"`);
        await queryRunner.query(`ALTER TABLE "plan"."message" DROP CONSTRAINT "FK_47cfc7592bce0eb1b5de51402ef"`);
        await queryRunner.query(`ALTER TABLE "plan"."message" ADD CONSTRAINT "FK_17c613f4653d2affa6052dda4e0" FOREIGN KEY ("workout_id") REFERENCES "plan"."workout"("worktout_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plan"."message" ALTER COLUMN "plan_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "plan"."message" ADD CONSTRAINT "FK_47cfc7592bce0eb1b5de51402ef" FOREIGN KEY ("plan_id") REFERENCES "plan"."plan"("plan_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plan"."message" DROP COLUMN "coach_id"`);
    }

}
