import {MigrationInterface, QueryRunner} from "typeorm";

export class Event5K1597213808541 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO "event"."event"(event_id, name, is_only_for_paid, position_in_list, distance) VALUES
            (7, '5K', false, 4, 5);
        `);

        await queryRunner.query(`UPDATE "event"."event" SET is_active=false WHERE event_id=3`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE "event"."event" SET is_active=true WHERE event_id=3`);

        await queryRunner.query(`UPDATE "event"."event" SET is_active=false WHERE event_id=7`);
    }

}
