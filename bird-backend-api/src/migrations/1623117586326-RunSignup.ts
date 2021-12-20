import {MigrationInterface, QueryRunner} from "typeorm";

export class RunSignup1623117586326 implements MigrationInterface {
    name = 'RunSignup1623117586326'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createSchema('runsignup');
        await queryRunner.query(`CREATE TABLE "runsignup"."race" ("race_id" SERIAL NOT NULL, "name" character varying NOT NULL, "newsletter_tag" character varying NOT NULL, "end_after_date" date, "rsu_race_id" integer NOT NULL, "api_key" character varying NOT NULL, "api_secret" character varying NOT NULL, "google_file_id" character varying NOT NULL, CONSTRAINT "PK_f547d476c1952999b0b4bc705d5" PRIMARY KEY ("race_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "runsignup"."participant" ("participant_id" SERIAL NOT NULL, "rsu_user_id" integer, "first_name" character varying, "middle_name" character varying, "last_name" character varying, "email" character varying, "dob" character varying, "age" integer, "gender" character varying, "phone" character varying, "street" character varying, "city" character varying, "state" character varying, "zipcode" character varying, "country_code" character varying, "registration_id" character varying, "registration_date" date, "rsu_race_id" integer, "race_name" character varying, "event_id" integer, "event_name" character varying, "event_start_time" character varying, "raceRaceId" integer, CONSTRAINT "PK_5ebcb80a82e706d417c692ccc06" PRIMARY KEY ("participant_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "runsignup"."participant" ADD CONSTRAINT "FK_8b1f1598e7bd7e4a24cacba43f6" FOREIGN KEY ("raceRaceId") REFERENCES "runsignup"."race"("race_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "runsignup"."participant" DROP CONSTRAINT "FK_8b1f1598e7bd7e4a24cacba43f6"`, undefined);
        await queryRunner.query(`DROP TABLE "runsignup"."participant"`, undefined);
        await queryRunner.query(`DROP TABLE "runsignup"."race"`, undefined);
        await queryRunner.dropSchema('runsignup');
    }

}
