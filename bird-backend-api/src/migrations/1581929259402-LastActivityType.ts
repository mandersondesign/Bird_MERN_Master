import {MigrationInterface, QueryRunner} from "typeorm";

export class LastActivityType1581929259402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO "user"."last_activity_type"(last_activity_type_id, name) VALUES
            (6, 'Plan ended');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
