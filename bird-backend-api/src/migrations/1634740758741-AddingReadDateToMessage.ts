import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingReadDateToMessage1634740758741 implements MigrationInterface {
    name = 'AddingReadDateToMessage1634740758741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan"."message" ADD "read_date" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan"."message" DROP COLUMN "read_date"`)
    }

}
