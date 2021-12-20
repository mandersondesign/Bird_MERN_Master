import {MigrationInterface, QueryRunner} from "typeorm";

export class LastActivityComment1579782598446 implements MigrationInterface {
    name = 'LastActivityComment1579782598446'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."last_activity" ADD "comment" character varying`);

        await queryRunner.query(`
            INSERT INTO "user"."last_activity_type"(last_activity_type_id, name) VALUES
            (1, 'Invitation sent'),
            (2, 'Signup completed'),
            (3, 'Onboarding completed'),
            (4, 'Plan assigned'),
            (5, 'Workout completed');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."last_activity" DROP COLUMN "comment"`);
    }

}
