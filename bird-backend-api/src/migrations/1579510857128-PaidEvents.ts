import {MigrationInterface, QueryRunner} from "typeorm";

export class PaidEvents1579510857128 implements MigrationInterface {
    name = 'PaidEvents1579510857128'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event"."event" ADD "is_only_for_paid" boolean NOT NULL DEFAULT false`);

        await queryRunner.query(`
            INSERT INTO "event"."event"(event_id, name, is_only_for_paid) VALUES
            (4, 'Speed', true), 
            (5, 'Other', true);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event"."event" DROP COLUMN "is_only_for_paid"`);
    }

}
