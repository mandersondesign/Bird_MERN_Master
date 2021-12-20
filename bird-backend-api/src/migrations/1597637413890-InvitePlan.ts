import {MigrationInterface, QueryRunner} from "typeorm";

export class InvitePlan1597637413890 implements MigrationInterface {
    name = 'InvitePlan1597637413890'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."invite" ADD "fletfeet_event_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."invite" ADD CONSTRAINT "FK_6e4bce8842e4cc3b5b6f851c19e" FOREIGN KEY ("fletfeet_event_id") REFERENCES "fleetfeet"."event"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."invite" DROP CONSTRAINT "FK_6e4bce8842e4cc3b5b6f851c19e"`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."invite" DROP COLUMN "fletfeet_event_id"`, undefined);
    }

}
