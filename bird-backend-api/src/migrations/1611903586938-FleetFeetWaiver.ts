import {MigrationInterface, QueryRunner} from "typeorm";

export class FleetFeetWaiver1611903586938 implements MigrationInterface {
    name = 'FleetFeetWaiver1611903586938'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "fleetfeet"."waiver" ("waiver_id" SERIAL NOT NULL, "event_type_id" integer NOT NULL DEFAULT 1, "text" character varying NOT NULL, CONSTRAINT "PK_75362d1926d35ca5a716fe74875" PRIMARY KEY ("waiver_id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "fleetfeet"."waiver"`, undefined);
    }

}
