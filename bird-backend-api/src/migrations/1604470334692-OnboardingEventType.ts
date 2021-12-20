import {MigrationInterface, QueryRunner} from "typeorm";

export class OnboardingEventType1604470334692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "event_type_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "event_type_id"`);
    }

}
