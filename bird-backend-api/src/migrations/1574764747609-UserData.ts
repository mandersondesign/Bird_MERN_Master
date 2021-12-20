import {MigrationInterface, QueryRunner} from "typeorm";

export class UserData1574764747609 implements MigrationInterface {
    name = 'UserData1574764747609'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user"."additional_data" ("additional_data_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "important_goal" character varying, "long_race_id" integer, "current_distance_per_week_id" integer, "status_of_halt_marathon" integer, "date_of_race" TIMESTAMP, "goal_time" integer, "current_5k_record" integer, CONSTRAINT "PK_6610b15557fd4ad29133478cc18" PRIMARY KEY ("additional_data_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user"."user_calendar" ("user_calendar_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "mon" boolean NOT NULL DEFAULT false, "tue" boolean NOT NULL DEFAULT false, "wed" boolean NOT NULL DEFAULT false, "the" boolean NOT NULL DEFAULT false, "fri" boolean NOT NULL DEFAULT false, "sat" boolean NOT NULL DEFAULT false, "sun" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_4d5f9ec0aa5f52dcd9df6f6416c" PRIMARY KEY ("user_calendar_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."additional_data" ADD CONSTRAINT "FK_64a8f7db259e5627fd2e7b3fadf" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_calendar" ADD CONSTRAINT "FK_fe33664207043440f8c594fea31" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_calendar" DROP CONSTRAINT "FK_fe33664207043440f8c594fea31"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."additional_data" DROP CONSTRAINT "FK_64a8f7db259e5627fd2e7b3fadf"`, undefined);
        await queryRunner.query(`DROP TABLE "user"."user_calendar"`, undefined);
        await queryRunner.query(`DROP TABLE "user"."additional_data"`, undefined);
    }

}
