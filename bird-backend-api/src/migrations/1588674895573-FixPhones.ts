import {MigrationInterface, QueryRunner} from "typeorm";

export class FixPhones1588674895573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE "user"."user" SET phone = REPLACE(phone,'+','')`);

        await queryRunner.query(`UPDATE "user"."user" SET phone = REPLACE(phone,'-','')`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
