import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMessages1581545149374 implements MigrationInterface {
    name = 'UserMessages1581545149374'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "plan"."message" ("message_id" SERIAL NOT NULL, "plan_id" integer NOT NULL, "athlete_id" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL DEFAULT '', "is_from_athlete" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_713e0575fcc07ca960c53e63218" PRIMARY KEY ("message_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."message" ADD CONSTRAINT "FK_47cfc7592bce0eb1b5de51402ef" FOREIGN KEY ("plan_id") REFERENCES "plan"."plan"("plan_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."message" ADD CONSTRAINT "FK_7086a6b950af3733db31c319d05" FOREIGN KEY ("athlete_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."message" DROP CONSTRAINT "FK_7086a6b950af3733db31c319d05"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."message" DROP CONSTRAINT "FK_47cfc7592bce0eb1b5de51402ef"`, undefined);
        await queryRunner.query(`DROP TABLE "plan"."message"`, undefined);
    }

}
