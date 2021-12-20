import {MigrationInterface, QueryRunner} from "typeorm";

export class CoachToPlan1590581291319 implements MigrationInterface {
    name = 'CoachToPlan1590581291319'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "subscription"."coach_plan_to_user" ("coach_plan_to_user_id" integer NOT NULL, "coach_id" integer NOT NULL, "coach_plan_id" integer NOT NULL, "start_date" TIMESTAMP NOT NULL DEFAULT now(), "paid_to_date" TIMESTAMP, "error_message" character varying, CONSTRAINT "PK_d015e427433f7c98a332ef8cca6" PRIMARY KEY ("coach_plan_to_user_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."coach_plan_to_user" ADD CONSTRAINT "FK_2e87e2301684634ddfe0d283cdd" FOREIGN KEY ("coach_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."coach_plan_to_user" ADD CONSTRAINT "FK_8fefd2260c2317255c2163c6684" FOREIGN KEY ("coach_plan_id") REFERENCES "subscription"."coach_plan"("coach_plan_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription"."coach_plan_to_user" DROP CONSTRAINT "FK_8fefd2260c2317255c2163c6684"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."coach_plan_to_user" DROP CONSTRAINT "FK_2e87e2301684634ddfe0d283cdd"`, undefined);
        await queryRunner.query(`DROP TABLE "subscription"."coach_plan_to_user"`, undefined);
    }

}
