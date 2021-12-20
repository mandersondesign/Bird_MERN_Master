import {MigrationInterface, QueryRunner} from "typeorm";

export class FCMToken1603688732270 implements MigrationInterface {
    name = 'FCMToken1603688732270'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user"."fcm_token" ("fcm_token_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "session_id" integer NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_d06786043a14558b4560ad09571" PRIMARY KEY ("fcm_token_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."fcm_token" ADD CONSTRAINT "FK_b212aff419400432e231f4b60d9" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."fcm_token" ADD CONSTRAINT "FK_65cca5aa3bf8ce50614ff283db5" FOREIGN KEY ("session_id") REFERENCES "user"."session"("session_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."fcm_token" DROP CONSTRAINT "FK_65cca5aa3bf8ce50614ff283db5"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."fcm_token" DROP CONSTRAINT "FK_b212aff419400432e231f4b60d9"`, undefined);
        await queryRunner.query(`DROP TABLE "user"."fcm_token"`, undefined);
    }

}
