import {MigrationInterface, QueryRunner} from "typeorm";

export class SubscriptionPlan1593341220614 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO subscription.coach_plan (coach_plan_id, name, description, options, max_athletes, max_templates, is_active, is_public, price, stripe_plan_id) VALUES (4, 'Enterprise', '', NULL, NULL, NULL, true, false, 0.00, NULL);
            INSERT INTO subscription.coach_plan (coach_plan_id, name, description, options, max_athletes, max_templates, is_active, is_public, price, stripe_plan_id) VALUES (3, 'Team', 'Manage your team’s training and create a personalized experience.', '{"Unlimited custom training plans","Bird athlete app to deliver group training","Personalized workouts, paces, and notes for each athlete"}', 50, NULL, true, true, 89.00, 'price_1GsqywAi1bWAALFuUaOLh4OZ');
            INSERT INTO subscription.coach_plan (coach_plan_id, name, description, options, max_athletes, max_templates, is_active, is_public, price, stripe_plan_id) VALUES (2, 'Core', 'Save time coaching and improve communication with your athletes.', '{"Unlimited custom training plans","Unique athlete pace cards to personalize workouts","Daily athlete feedback and smart dashboard to monitor progress"}', 20, NULL, true, true, 39.00, 'price_HNzhrVw1LuPw4q');
            INSERT INTO subscription.coach_plan (coach_plan_id, name, description, options, max_athletes, max_templates, is_active, is_public, price, stripe_plan_id) VALUES (1, 'Free', 'Try Bird for free with up to 5 athletes.', '{"Customizable Bird training plans and one custom plan of your own","Daily athlete feedback","Smart dashboard to monitor athlete progress"}', 5, 0, true, true, 0.00, NULL);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
