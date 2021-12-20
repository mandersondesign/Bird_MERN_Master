import {MigrationInterface, QueryRunner} from "typeorm";

export class UserCreatedAt1592216195852 implements MigrationInterface {
    name = 'UserCreatedAt1592216195852'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "created_at"`);
    }

}
