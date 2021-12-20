import {MigrationInterface, QueryRunner} from "typeorm";

export class FleetFeetEventPlanTemplate1596742970961 implements MigrationInterface {
    name = 'FleetFeetEventPlanTemplate1596742970961'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" ADD "plan_template_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" ADD CONSTRAINT "FK_0d227974267b8286e4730e03736" FOREIGN KEY ("plan_template_id") REFERENCES "plan"."plan_template"("plan_template_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" DROP CONSTRAINT "FK_0d227974267b8286e4730e03736"`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" DROP COLUMN "plan_template_id"`, undefined);
    }

}
