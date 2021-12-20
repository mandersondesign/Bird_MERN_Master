import {MigrationInterface, QueryRunner} from "typeorm";

export class BillingAddress1620679467303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "address" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "city" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "zip_code" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "country" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "address"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "city"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "zip_code"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "country"`, undefined);
    }

}
