import {MigrationInterface, QueryRunner} from "typeorm";

export class PreRisk1578394482479 implements MigrationInterface {
    name = 'PreRisk1578394482479'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "pre_risk" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "pre_risk"`);
    }

}
