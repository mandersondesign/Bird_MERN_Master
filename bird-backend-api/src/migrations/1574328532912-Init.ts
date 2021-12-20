import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1574328532912 implements MigrationInterface {
    name = 'Init1574328532912'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createSchema('user');
        await queryRunner.query(`CREATE TABLE "user"."user_type" ("user_type_id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_fdb88e5d5dbc38bd217d27b0004" PRIMARY KEY ("user_type_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user"."user" ("user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying, "user_type_id" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0" UNIQUE ("email"), CONSTRAINT "PK_076c63bcea93cbf36558312bf6c" PRIMARY KEY ("user_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user"."session" ("session_id" SERIAL NOT NULL, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_user_time" TIMESTAMP NOT NULL DEFAULT now(), "last_user_ip" inet, "user_id" integer, CONSTRAINT "PK_50c2b6e58a37166dab435111f25" PRIMARY KEY ("session_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" ADD CONSTRAINT "FK_c31f4b0e7957755ac4ee2e15eb0" FOREIGN KEY ("user_type_id") REFERENCES "user"."user_type"("user_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."session" ADD CONSTRAINT "FK_13275383dcdf095ee29f2b3455a" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."session" DROP CONSTRAINT "FK_13275383dcdf095ee29f2b3455a"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" DROP CONSTRAINT "FK_c31f4b0e7957755ac4ee2e15eb0"`, undefined);
        await queryRunner.query(`DROP TABLE "user"."session"`, undefined);
        await queryRunner.query(`DROP TABLE "user"."user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"."user_type"`, undefined);
        await queryRunner.dropSchema('user');
    }

}
