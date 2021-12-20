import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductStrava1611814882155 implements MigrationInterface {
    name = 'ProductStrava1611814882155'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."program" ADD "stripe_product_id" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."program" DROP COLUMN "stripe_product_id"`, undefined);
    }

}
