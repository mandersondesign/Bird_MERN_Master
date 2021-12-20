import {MigrationInterface, QueryRunner} from "typeorm";

export class AdminPassword1582287261050 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const hash = '$2b$10$KchBQ3FAjhxXiogSGI7x4exJWSU/LiUGExPUD4UtWfkf/Fo/8hgeq';

        await queryRunner.query(`UPDATE "user"."user" SET password='${hash}' WHERE email='bird@consideritdone.tech'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
