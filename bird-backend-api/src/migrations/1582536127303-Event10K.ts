import {MigrationInterface, QueryRunner} from "typeorm";

export class Event10K1582536127303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO "event"."event"(event_id, name, is_only_for_paid, position_in_list) VALUES
            (6, '10K', false, 4);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
