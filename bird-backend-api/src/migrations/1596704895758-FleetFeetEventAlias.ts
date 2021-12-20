import {MigrationInterface, QueryRunner} from "typeorm";

export class FleetFeetEventAlias1596704895758 implements MigrationInterface {
    name = 'FleetFeetEventAlias1596704895758'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" ADD "alias" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" DROP COLUMN "alias"`, undefined);
    }

}
