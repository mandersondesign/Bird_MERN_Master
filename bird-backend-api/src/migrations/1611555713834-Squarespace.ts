import {MigrationInterface, QueryRunner} from "typeorm";

export class Squarespace1611555713834 implements MigrationInterface {
    name = 'Squarespace1611555713834'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createSchema('squarespace');
        await queryRunner.query(`CREATE TABLE "squarespace"."order" ("order_id" SERIAL NOT NULL, "email" character varying NOT NULL, "order_number" integer, "created_on" TIMESTAMP, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "product_name" character varying, "plan_template_id" integer, CONSTRAINT "PK_0f91b4bd4cc76c9a63f1e9fe72a" PRIMARY KEY ("order_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "squarespace"."order" ADD CONSTRAINT "FK_40699f7f8e9664cdda0ce45df5f" FOREIGN KEY ("plan_template_id") REFERENCES "plan"."plan_template"("plan_template_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "squarespace"."order" DROP CONSTRAINT "FK_40699f7f8e9664cdda0ce45df5f"`, undefined);
        await queryRunner.query(`DROP TABLE "squarespace"."order"`, undefined);
        await queryRunner.dropSchema('squarespace');
    }

}
