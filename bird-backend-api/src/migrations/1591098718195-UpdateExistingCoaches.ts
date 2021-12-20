import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateExistingCoaches1591098718195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE "user"."user" SET is_onboarding_completed=true WHERE user_type_id=2`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
