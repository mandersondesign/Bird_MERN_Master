import {MigrationInterface, QueryRunner} from "typeorm";

export class FleetFeetEventPlanTemplateLevels1599099315628 implements MigrationInterface {
    name = 'FleetFeetEventPlanTemplateLevels1599099315628'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" ADD "beginner_plan_template_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" ADD "advance_plan_template_id" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" DROP COLUMN "advance_plan_template_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "fleetfeet"."event" DROP COLUMN "beginner_plan_template_id"`, undefined);
    }

}
