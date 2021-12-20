import {MigrationInterface, QueryRunner} from "typeorm";

export class K10Distance1583481247101 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE "event"."event" SET distance=10 WHERE event_id=6`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
