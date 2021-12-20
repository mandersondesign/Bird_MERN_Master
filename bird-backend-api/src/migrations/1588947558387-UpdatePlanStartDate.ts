import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePlanStartDate1588947558387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // Sunday + 1 = monday
        await queryRunner.query(`UPDATE plan.plan SET  start_date=start_date + INTERVAL '1 day' WHERE EXTRACT(DOW FROM start_date)=0`);

        // Tuesday 
        await queryRunner.query(`UPDATE plan.plan SET  start_date=start_date + INTERVAL '6 day' WHERE EXTRACT(DOW FROM start_date)=2`);

        // Wednesday
        await queryRunner.query(`UPDATE plan.plan SET  start_date=start_date + INTERVAL '5 day' WHERE EXTRACT(DOW FROM start_date)=3`);

        // Thursday
        await queryRunner.query(`UPDATE plan.plan SET  start_date=start_date + INTERVAL '4 day' WHERE EXTRACT(DOW FROM start_date)=4`);

        // Friday
        await queryRunner.query(`UPDATE plan.plan SET  start_date=start_date + INTERVAL '3 day' WHERE EXTRACT(DOW FROM start_date)=5`);

        // Saturday
        await queryRunner.query(`UPDATE plan.plan SET  start_date=start_date + INTERVAL '2 day' WHERE EXTRACT(DOW FROM start_date)=6`);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
