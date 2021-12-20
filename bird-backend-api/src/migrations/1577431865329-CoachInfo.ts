import {MigrationInterface, QueryRunner} from "typeorm";

export class CoachInfo1577431865329 implements MigrationInterface {
    name = 'CoachInfo1577431865329'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user"."coach_info" ("user_id" integer NOT NULL, "about" character varying NOT NULL, "specialties" text array, "images" text array, CONSTRAINT "REL_6e06a6606455fd34b1ac8652bd" UNIQUE ("user_id"), CONSTRAINT "PK_6e06a6606455fd34b1ac8652bda" PRIMARY KEY ("user_id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"."coach_info"`, undefined);
    }

}
