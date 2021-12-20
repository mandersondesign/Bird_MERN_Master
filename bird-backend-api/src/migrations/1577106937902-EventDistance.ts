import {MigrationInterface, QueryRunner} from "typeorm";

export class EventDistance1577106937902 implements MigrationInterface {
    name = 'EventDistance1577106937902'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event"."event" ADD "distance" numeric(5,3)`);

        await queryRunner.query(`UPDATE "event"."event" SET distance=13.109 WHERE event_id=1`);
        await queryRunner.query(`UPDATE "event"."event" SET distance=26.219 WHERE event_id=2`);
        await queryRunner.query(`UPDATE "event"."event" SET distance=30 WHERE event_id=3`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event"."event" DROP COLUMN "distance"`);
    }

}
