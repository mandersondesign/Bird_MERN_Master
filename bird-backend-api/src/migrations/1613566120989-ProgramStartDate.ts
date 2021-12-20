import {MigrationInterface, QueryRunner} from "typeorm";

export class ProgramStartDate1613566120989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."program" ADD "start_date" date`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."program" DROP COLUMN "start_date"`, undefined);
    }

}
