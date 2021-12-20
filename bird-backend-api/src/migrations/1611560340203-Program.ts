import {MigrationInterface, QueryRunner} from "typeorm";

export class Program1611560340203 implements MigrationInterface {
    name = 'Program1611560340203'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "plan"."program" ("program_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(5,2), "is_active" boolean NOT NULL DEFAULT true, "alias" character varying, "plan_template_id" integer, CONSTRAINT "PK_bec2be3f0540283c5bc955b4230" PRIMARY KEY ("program_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."program" ADD CONSTRAINT "FK_0dd9c5f6c98f01403f70f2abeda" FOREIGN KEY ("plan_template_id") REFERENCES "plan"."plan_template"("plan_template_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."program" DROP CONSTRAINT "FK_0dd9c5f6c98f01403f70f2abeda"`, undefined);
        await queryRunner.query(`DROP TABLE "plan"."program"`, undefined);
    }

}
