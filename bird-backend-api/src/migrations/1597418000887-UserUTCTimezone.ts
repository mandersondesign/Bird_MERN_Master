import {MigrationInterface, QueryRunner} from "typeorm";

export class UserUTCTimezone1597418000887 implements MigrationInterface {
    name = 'UserUTCTimezone1597418000887'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "notification_utc_hour" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "notification_utc_hour"`, undefined);
    }

}
