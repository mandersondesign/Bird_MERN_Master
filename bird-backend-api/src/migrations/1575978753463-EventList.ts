import {MigrationInterface, QueryRunner} from "typeorm";

export class EventList1575978753463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "event"."event"`);

        await queryRunner.query(`
            INSERT INTO "event"."event"(event_id, name) VALUES
            (1, 'Half Marathon'), 
            (2, 'Marathon'), 
            (3, 'Ultra Marathon');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        
    }

}
