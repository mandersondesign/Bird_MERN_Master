import {MigrationInterface, QueryRunner} from "typeorm";

export class EventHtml1575637135120 implements MigrationInterface {
    name = 'EventHtml1575637135120'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event"."event" ADD "html" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event"."event" DROP COLUMN "html"`, undefined);
    }

}
