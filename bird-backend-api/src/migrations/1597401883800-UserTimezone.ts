import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTimezone1597401883800 implements MigrationInterface {
    name = 'UserTimezone1597401883800'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "timezone" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "notification_hour" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "notification_hour"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "timezone"`, undefined);
    }

}
