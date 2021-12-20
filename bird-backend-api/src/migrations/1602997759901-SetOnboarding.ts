import {MigrationInterface, QueryRunner} from "typeorm";

export class SetOnboarding1602997759901 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            UPDATE 
                "user"."user" u
            SET 
                is_onboarding_completed=true
            WHERE 
                u.user_id IN (
                    select u.user_id from "user"."user" as u
                    inner join "plan"."plan" p on u.user_id=p.athlete_id
                    where u.is_onboarding_completed=false and p.plan_id is not null
                    group by u.user_id
                )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
