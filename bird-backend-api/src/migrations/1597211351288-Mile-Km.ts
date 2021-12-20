import {MigrationInterface, QueryRunner} from "typeorm";

export class MileKm1597211351288 implements MigrationInterface {
    name = 'MileKm1597211351288'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."coach_info" ADD "measurement_id" integer NOT NULL DEFAULT 1`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."coach_info" DROP COLUMN "measurement_id"`, undefined);
    }

}
