import {MigrationInterface, QueryRunner} from "typeorm";

export class FleetFeetUser1596630134089 implements MigrationInterface {
    name = 'FleetFeetUser1596630134089'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "source_id" integer NOT NULL DEFAULT 1`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "source_id"`, undefined);
    }

}
