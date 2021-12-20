import {MigrationInterface, QueryRunner} from "typeorm";

export class FleetFeetEventType1611900926366 implements MigrationInterface {
    name = 'FleetFeetEventType1611900926366'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" ADD "event_type_id" integer NOT NULL DEFAULT 1`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_question" ADD "event_type_id" integer NOT NULL DEFAULT 1`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."survey_question" DROP COLUMN "event_type_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" DROP COLUMN "event_type_id"`, undefined);
    }

}
