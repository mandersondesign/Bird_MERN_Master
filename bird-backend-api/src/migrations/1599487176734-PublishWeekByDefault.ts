import {MigrationInterface, QueryRunner} from "typeorm";

export class PublishWeekByDefault1599487176734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE "plan"."plan_week" SET is_published=true`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
