import {MigrationInterface, QueryRunner} from "typeorm";

export class MessageWorkoutIdFK1585492617036 implements MigrationInterface {
    name = 'MessageWorkoutIdFK1585492617036'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."message" ADD CONSTRAINT "FK_17c613f4653d2affa6052dda4e0" FOREIGN KEY ("workout_id") REFERENCES "plan"."workout"("worktout_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."message" DROP CONSTRAINT "FK_17c613f4653d2affa6052dda4e0"`, undefined);
    }

}
