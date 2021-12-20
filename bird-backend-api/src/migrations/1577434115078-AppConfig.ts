import {MigrationInterface, QueryRunner} from "typeorm";

export class AppConfig1577434115078 implements MigrationInterface {
    name = 'AppConfig1577434115078'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app"."config" DROP CONSTRAINT "FK_b6a7035c0b3a1780b8098c8311a"`, undefined);
        await queryRunner.query(`ALTER TABLE "app"."config" DROP COLUMN "user_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "app"."config" ADD CONSTRAINT "FK_e909bdd83f9c93c16b7f83d2842" FOREIGN KEY ("default_coach_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app"."config" DROP CONSTRAINT "FK_e909bdd83f9c93c16b7f83d2842"`, undefined);
        await queryRunner.query(`ALTER TABLE "app"."config" ADD "user_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "app"."config" ADD CONSTRAINT "FK_b6a7035c0b3a1780b8098c8311a" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
