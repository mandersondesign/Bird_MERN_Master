import {MigrationInterface, QueryRunner} from "typeorm";

export class AdminPassword1582287261049 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const hash = '$2y$10$R/y3Vo9sb4kln2.tHMhKZuXk4yZ0KoF5HXKzaf69lB3yqXktJZNPy';

        await queryRunner.query(`UPDATE "user"."user" SET password='${hash}' WHERE email='bird@consideritdone.tech'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
