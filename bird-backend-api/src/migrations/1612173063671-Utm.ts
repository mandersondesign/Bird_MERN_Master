import {MigrationInterface, QueryRunner} from "typeorm";

export class Utm1612173063671 implements MigrationInterface {
    name = 'Utm1612173063671'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user"."utm" ("utm_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "utm_source" character varying, "utm_medium" character varying, "utm_campaign" character varying, "utm_term" character varying, "utm_content" character varying, CONSTRAINT "PK_5ea14a9babaa102a9171effa875" PRIMARY KEY ("utm_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."utm" ADD CONSTRAINT "FK_f18e8167baa6009be1535ab0b19" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."utm" DROP CONSTRAINT "FK_f18e8167baa6009be1535ab0b19"`, undefined);
        await queryRunner.query(`DROP TABLE "user"."utm"`, undefined);
    }

}
