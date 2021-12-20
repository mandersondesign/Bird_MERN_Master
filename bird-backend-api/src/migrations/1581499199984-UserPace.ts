import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPace1581499199984 implements MigrationInterface {
    name = 'UserPace1581499199984'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "plan"."user_pace"`);

        await queryRunner.query(`ALTER TABLE "plan"."user_pace" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" ADD "value" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" ADD "value" numeric(5,3) NOT NULL`);
    }

}
