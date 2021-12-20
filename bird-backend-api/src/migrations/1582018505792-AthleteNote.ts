import {MigrationInterface, QueryRunner} from "typeorm";

export class AthleteNote1582018505792 implements MigrationInterface {
    name = 'AthleteNote1582018505792'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user"."note" ("note_id" SERIAL NOT NULL, "coach_id" integer NOT NULL, "athlete_id" integer NOT NULL, "text" character varying, CONSTRAINT "PK_ef685666923fc505c84aa805011" PRIMARY KEY ("note_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."note" ADD CONSTRAINT "FK_dec195dd492269634bf243c3588" FOREIGN KEY ("coach_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."note" ADD CONSTRAINT "FK_d6401b19d2363fee905a6c164c1" FOREIGN KEY ("athlete_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."note" DROP CONSTRAINT "FK_d6401b19d2363fee905a6c164c1"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."note" DROP CONSTRAINT "FK_dec195dd492269634bf243c3588"`, undefined);
        await queryRunner.query(`DROP TABLE "user"."note"`, undefined);
    }

}
