import {MigrationInterface, QueryRunner} from "typeorm";

export class FFStartDate1613374597242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" ADD "start_date" date`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" DROP COLUMN "start_date"`, undefined);
    }

}
