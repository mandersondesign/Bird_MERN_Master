import {MigrationInterface, QueryRunner} from "typeorm";

export class UserInfo1575284646297 implements MigrationInterface {
    name = 'UserInfo1575284646297'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user"."user_info" ("user_id" integer NOT NULL, "important_goal" character varying, "long_race_id" integer, "current_distance_per_week_id" integer, "status_of_halt_marathon" integer, "date_of_race" TIMESTAMP, "goal_time" integer, "current_5k_record" integer, CONSTRAINT "REL_a73a9573e8b83dfa061d42eadc" UNIQUE ("user_id"), CONSTRAINT "PK_a73a9573e8b83dfa061d42eadca" PRIMARY KEY ("user_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."session" DROP CONSTRAINT "FK_13275383dcdf095ee29f2b3455a"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."session" ALTER COLUMN "user_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."session" ALTER COLUMN "is_active" SET DEFAULT true`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."session" ADD CONSTRAINT "FK_13275383dcdf095ee29f2b3455a" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD CONSTRAINT "FK_a73a9573e8b83dfa061d42eadca" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP CONSTRAINT "FK_a73a9573e8b83dfa061d42eadca"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."session" DROP CONSTRAINT "FK_13275383dcdf095ee29f2b3455a"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."session" ALTER COLUMN "is_active" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."session" ALTER COLUMN "user_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."session" ADD CONSTRAINT "FK_13275383dcdf095ee29f2b3455a" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`DROP TABLE "user"."user_info"`, undefined);
    }

}
