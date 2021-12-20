import {MigrationInterface, QueryRunner} from "typeorm";

export class EventPosition1579591112833 implements MigrationInterface {
    name = 'EventPosition1579591112833'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event"."event" ADD "position_in_list" integer`);

        await queryRunner.query(`UPDATE "event"."event" SET position_in_list=1 WHERE event_id=4`);
        await queryRunner.query(`UPDATE "event"."event" SET position_in_list=2 WHERE event_id=1`);
        await queryRunner.query(`UPDATE "event"."event" SET position_in_list=3 WHERE event_id=2`);
        await queryRunner.query(`UPDATE "event"."event" SET position_in_list=4 WHERE event_id=3`);
        await queryRunner.query(`UPDATE "event"."event" SET position_in_list=5 WHERE event_id=5`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event"."event" DROP COLUMN "position_in_list"`);
    }

}
