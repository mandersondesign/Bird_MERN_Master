import {MigrationInterface, QueryRunner} from "typeorm";

export class CurrentWeek1578910202875 implements MigrationInterface {
    name = 'CurrentWeek1578910202875'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" ADD "current_week" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan" DROP COLUMN "current_week"`);
    }

}
