import {MigrationInterface, QueryRunner} from "typeorm";

export class OnboardingLevel1604473711492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "level_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "level_id"`);
    }

}
