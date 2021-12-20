import {MigrationInterface, QueryRunner} from "typeorm";
import PlanService from "../services/planService";

export class UpdatePublishDate1592333524963 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // [{ plan_id, number_of_week, start_date }]
        const list = await queryRunner.query(`
            SELECT p.plan_id as plan_id, max(pw.number_of_week) as number_of_week, p.start_date
			FROM plan.plan as p
            LEFT JOIN plan.plan_week as pw ON pw.plan_id=p.plan_id
            WHERE pw.is_published=true and p.is_active=true
            GROUP BY p.plan_id
        `);

        if (list) {
            for (var item of list) {
                const startDate : string = item.start_date.toLocaleString('en-US').split(',')[0];
                const targetMonday = PlanService.getMondayOfCustomWeek(new Date(`${startDate}`), item.number_of_week);
                await queryRunner.query(`UPDATE "plan"."plan" SET publish_date='${targetMonday.toLocaleString('en-US').split(',')[0]}' WHERE plan_id=${item.plan_id}`);
            }
        }

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
