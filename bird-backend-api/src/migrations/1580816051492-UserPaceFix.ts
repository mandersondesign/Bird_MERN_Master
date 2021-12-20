import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPaceFix1580816051492 implements MigrationInterface {
    name = 'UserPaceFix1580816051492'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" DROP CONSTRAINT "FK_b5c8daeb7e352dad347c0ca3d4c"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" DROP COLUMN "athlete_id"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" ADD "athlete_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" ADD CONSTRAINT "FK_b5c8daeb7e352dad347c0ca3d4c" FOREIGN KEY ("athlete_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
