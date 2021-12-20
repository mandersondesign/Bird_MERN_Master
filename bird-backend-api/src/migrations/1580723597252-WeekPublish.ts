import {MigrationInterface, QueryRunner} from "typeorm";

export class WeekPublish1580723597252 implements MigrationInterface {
    name = 'WeekPublish1580723597252'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_week" ADD "is_published" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."plan_week" DROP COLUMN "is_published"`);
    }

}
