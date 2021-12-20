import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveOldTable1575284646299 implements MigrationInterface {
    name = 'RemoveOldTable1575284646299'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"."additional_data"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user"."additional_data" ("additional_data_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "important_goal" character varying, "long_race_id" integer, "current_distance_per_week_id" integer, "status_of_halt_marathon" integer, "date_of_race" TIMESTAMP, "goal_time" integer, "current_5k_record" integer, CONSTRAINT "PK_6610b15557fd4ad29133478cc18" PRIMARY KEY ("additional_data_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."additional_data" ADD CONSTRAINT "FK_64a8f7db259e5627fd2e7b3fadf" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
