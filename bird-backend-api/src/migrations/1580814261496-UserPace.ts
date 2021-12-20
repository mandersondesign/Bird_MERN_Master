import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPace1580814261496 implements MigrationInterface {
    name = 'UserPace1580814261496'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "plan"."user_pace" ("user_pace_id" SERIAL NOT NULL, "plan_id" integer NOT NULL, "pace_id" integer NOT NULL, "athlete_id" integer NOT NULL, "value" numeric(5,3) NOT NULL, CONSTRAINT "PK_565ff2ecf5372d0694bd4e7f191" PRIMARY KEY ("user_pace_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" ADD CONSTRAINT "FK_98159fc6a1dad22d95502f0743c" FOREIGN KEY ("plan_id") REFERENCES "plan"."plan"("plan_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" ADD CONSTRAINT "FK_606d329ecccc19698bfd6a7ddc7" FOREIGN KEY ("pace_id") REFERENCES "plan"."pace"("pace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" ADD CONSTRAINT "FK_b5c8daeb7e352dad347c0ca3d4c" FOREIGN KEY ("athlete_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" DROP CONSTRAINT "FK_b5c8daeb7e352dad347c0ca3d4c"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" DROP CONSTRAINT "FK_606d329ecccc19698bfd6a7ddc7"`, undefined);
        await queryRunner.query(`ALTER TABLE "plan"."user_pace" DROP CONSTRAINT "FK_98159fc6a1dad22d95502f0743c"`, undefined);
        await queryRunner.query(`DROP TABLE "plan"."user_pace"`, undefined);
    }

}
