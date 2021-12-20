import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveCalendar1612248354863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"."user_calendar"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user"."user_calendar" ("user_calendar_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "mon" boolean NOT NULL DEFAULT false, "tue" boolean NOT NULL DEFAULT false, "wed" boolean NOT NULL DEFAULT false, "the" boolean NOT NULL DEFAULT false, "fri" boolean NOT NULL DEFAULT false, "sat" boolean NOT NULL DEFAULT false, "sun" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_4d5f9ec0aa5f52dcd9df6f6416c" PRIMARY KEY ("user_calendar_id"))`, undefined);
    }

}
