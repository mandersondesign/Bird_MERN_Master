import {MigrationInterface, QueryRunner} from "typeorm";

export class AppConfig1576673456075 implements MigrationInterface {
    name = 'AppConfig1576673456075'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createSchema('app');
        await queryRunner.query(`CREATE TABLE "app"."config" ("config_id" integer NOT NULL, "default_coach_id" integer, "user_id" integer, CONSTRAINT "PK_02bcb9596e0b83a11638a8004c8" PRIMARY KEY ("config_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "app"."config" ADD CONSTRAINT "FK_b6a7035c0b3a1780b8098c8311a" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app"."config" DROP CONSTRAINT "FK_b6a7035c0b3a1780b8098c8311a"`, undefined);
        await queryRunner.query(`DROP TABLE "app"."config"`, undefined);
        await queryRunner.dropSchema('app');
    }

}
