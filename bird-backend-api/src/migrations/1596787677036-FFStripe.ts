import {MigrationInterface, QueryRunner} from "typeorm";

export class FFStripe1596787677036 implements MigrationInterface {
    name = 'FFStripe1596787677036'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" ADD "stripe_product_id" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" DROP COLUMN "stripe_product_id"`, undefined);
    }

}
