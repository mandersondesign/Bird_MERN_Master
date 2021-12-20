import {MigrationInterface, QueryRunner} from "typeorm";

export class UserState1620681585064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "state" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "state"`, undefined);
    }

}
