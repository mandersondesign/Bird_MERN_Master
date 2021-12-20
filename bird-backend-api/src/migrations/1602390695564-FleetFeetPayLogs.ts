import {MigrationInterface, QueryRunner} from "typeorm";

export class FleetFeetPayLogs1602390695564 implements MigrationInterface {
    name = 'FleetFeetPayLogs1602390695564'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "fleetfeet"."pay_log" ("pay_log_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "event_id" integer NOT NULL, "amount" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5140cd0073d28f18dd3154837b2" PRIMARY KEY ("pay_log_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."pay_log" ADD CONSTRAINT "FK_2ecbe7eed870677dac20b5f9c07" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."pay_log" ADD CONSTRAINT "FK_2bfe990236e4b73c0564a856894" FOREIGN KEY ("event_id") REFERENCES "fleetfeet"."event"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."pay_log" DROP CONSTRAINT "FK_2bfe990236e4b73c0564a856894"`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."pay_log" DROP CONSTRAINT "FK_2ecbe7eed870677dac20b5f9c07"`, undefined);
        await queryRunner.query(`DROP TABLE "fleetfeet"."pay_log"`, undefined);
    }

}
