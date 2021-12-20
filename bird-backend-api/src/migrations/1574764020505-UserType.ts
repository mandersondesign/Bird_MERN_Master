import {MigrationInterface, QueryRunner} from "typeorm";

export class UserType1574764020505 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO "user"."user_type"(user_type_id, name) VALUES
            (1, 'Admin'), 
            (2, 'Coach'), 
            (3, 'Athlet');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
