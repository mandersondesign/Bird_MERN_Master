import {MigrationInterface, QueryRunner} from "typeorm";

export class Event1574942975989 implements MigrationInterface {
    name = 'Event1574942975989'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createSchema('event');
        await queryRunner.query(`CREATE TABLE "event"."event" ("event_id" SERIAL NOT NULL, "name" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "image" character varying, CONSTRAINT "PK_74b239fb604e18d217d2b472137" PRIMARY KEY ("event_id"))`, undefined);
            await queryRunner.query(`
            INSERT INTO "event"."event"(name, image) VALUES
            ('Fall Marathon', 'fall-marathon'), 
            ('Winter Speed', 'winter-speed'), 
            ('Maintaining My Base', 'maintaining-my-base'),
            ('Spring Half Marathon', 'spring-half-marathon'),
            ('Trail 50k', 'trail-50k');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "event"."event"`, undefined);
        await queryRunner.dropSchema('event');
    }

}
