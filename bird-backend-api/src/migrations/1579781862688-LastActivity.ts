import {MigrationInterface, QueryRunner} from "typeorm";

export class LastActivity1579781862688 implements MigrationInterface {
    name = 'LastActivity1579781862688'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user"."last_activity_type" ("last_activity_type_id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a9743fbcc9426665a0df40bffe2" PRIMARY KEY ("last_activity_type_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user"."last_activity" ("user_id" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "last_activity_type_id" integer NOT NULL, CONSTRAINT "REL_03d21c71e3c2dc6bd3b9f18363" UNIQUE ("user_id"), CONSTRAINT "PK_03d21c71e3c2dc6bd3b9f183635" PRIMARY KEY ("user_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."last_activity" ADD CONSTRAINT "FK_03d21c71e3c2dc6bd3b9f183635" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."last_activity" ADD CONSTRAINT "FK_fdf06bfa1f83166a4b3542c08ca" FOREIGN KEY ("last_activity_type_id") REFERENCES "user"."last_activity_type"("last_activity_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."last_activity" DROP CONSTRAINT "FK_fdf06bfa1f83166a4b3542c08ca"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."last_activity" DROP CONSTRAINT "FK_03d21c71e3c2dc6bd3b9f183635"`, undefined);
        await queryRunner.query(`DROP TABLE "user"."last_activity"`, undefined);
        await queryRunner.query(`DROP TABLE "user"."last_activity_type"`, undefined);
    }

}
