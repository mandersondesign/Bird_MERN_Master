import { MigrationInterface, QueryRunner } from "typeorm";

export class SettingReadDateDefaultOldMessages1634744345017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "plan"."message" SET read_date = NOw()`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "plan"."message" SET read_date = NULL`);
    }

}
