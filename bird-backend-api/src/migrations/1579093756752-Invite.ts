import {MigrationInterface, QueryRunner} from "typeorm";

export class Invite1579093756752 implements MigrationInterface {
    name = 'Invite1579093756752'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user"."invite" ("invite_id" SERIAL NOT NULL, "coach_id" integer NOT NULL, "athlete_id" integer NOT NULL, "is_accepted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bdac7b9f634089d8db0fb5ec360" PRIMARY KEY ("invite_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "is_paid" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."invite" ADD CONSTRAINT "FK_985bae8b415b88228b4a44d3f61" FOREIGN KEY ("coach_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."invite" ADD CONSTRAINT "FK_289ab15038fcf286287b6dd0707" FOREIGN KEY ("athlete_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."invite" DROP CONSTRAINT "FK_289ab15038fcf286287b6dd0707"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."invite" DROP CONSTRAINT "FK_985bae8b415b88228b4a44d3f61"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "is_paid"`, undefined);
        await queryRunner.query(`DROP TABLE "user"."invite"`, undefined);
    }

}
