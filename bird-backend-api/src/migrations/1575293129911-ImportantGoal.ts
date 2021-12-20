import {MigrationInterface, QueryRunner} from "typeorm";

export class ImportantGoal1575293129911 implements MigrationInterface {
    name = 'ImportantGoal1575293129911'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "event"."important_goal" ("important_goal_id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c8e36694e2a19dc971e17d9040f" PRIMARY KEY ("important_goal_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "important_goal"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "important_goal_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP CONSTRAINT "FK_a73a9573e8b83dfa061d42eadca"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD CONSTRAINT "UQ_a73a9573e8b83dfa061d42eadca" UNIQUE ("user_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD CONSTRAINT "FK_a73a9573e8b83dfa061d42eadca" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD CONSTRAINT "FK_cf6420283378f3db99ce6917471" FOREIGN KEY ("important_goal_id") REFERENCES "event"."important_goal"("important_goal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`
            INSERT INTO "event"."important_goal"(important_goal_id, name) VALUES
            (1, 'Building endurance'),
            (2, 'Getting faster'),
            (3, 'Preventing injury'),
            (4, 'Maintaining my base');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP CONSTRAINT "FK_cf6420283378f3db99ce6917471"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP CONSTRAINT "FK_a73a9573e8b83dfa061d42eadca"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP CONSTRAINT "UQ_a73a9573e8b83dfa061d42eadca"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD CONSTRAINT "FK_a73a9573e8b83dfa061d42eadca" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" DROP COLUMN "important_goal_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user_info" ADD "important_goal" character varying`, undefined);
        await queryRunner.query(`DROP TABLE "event"."important_goal"`, undefined);
    }

}
