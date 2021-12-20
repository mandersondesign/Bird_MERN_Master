import { EntityRepository, In, Repository } from 'typeorm';
import Plan from '../../models/plan/plan';
import PlanTemplate from '../../models/plan/plan_template';
import UserType from '../../models/user/user_type';

@EntityRepository(Plan)
export default class PlanRepository extends Repository<Plan> {
	public async getById(planId: number): Promise<Plan> {
		return this.findOne({
			where: {
				planId,
			}
		});
	}

	public async getFullPlanById(planId: number): Promise<Plan> {
		return this.createQueryBuilder('plan')
			.leftJoinAndSelect('plan.event', 'event')
			.leftJoinAndSelect('plan.coach', 'coach')
			.leftJoinAndSelect('coach.coachInfo', 'coachInfo')
			.leftJoinAndSelect('plan.planWeeks', 'planWeeks')
			.leftJoinAndSelect('planWeeks.phase', 'phase')
			.leftJoinAndSelect('planWeeks.workouts', 'workouts')
			.leftJoinAndSelect('workouts.workoutType', 'workoutType')
			.where(`plan.planId=${planId}`)
			.andWhere('plan.isActive=TRUE')
			.orderBy({
				'planWeeks.numberOfPhase': 'ASC',
				'planWeeks.numberOfWeek': 'ASC',
				'workouts.date': 'ASC',
			})
			.getOne();
	}

	public async getPlansByPlanTemplateId(planTemplateId: number): Promise<Plan[]> {
		return this.createQueryBuilder('plan')
			.leftJoinAndSelect('plan.event', 'event')
			.leftJoinAndSelect('plan.coach', 'coach')
			.leftJoinAndSelect('coach.coachInfo', 'coachInfo')
			.leftJoinAndSelect('plan.planWeeks', 'planWeeks')
			.leftJoinAndSelect('planWeeks.phase', 'phase')
			.leftJoinAndSelect('planWeeks.workouts', 'workouts')
			.leftJoinAndSelect('workouts.workoutType', 'workoutType')
			.where(`plan.planTemplateId=${planTemplateId}`)
			.andWhere('plan.isActive=TRUE')
			.orderBy({
				'planWeeks.numberOfPhase': 'ASC',
				'planWeeks.numberOfWeek': 'ASC',
				'workouts.date': 'ASC',
			})
			.getMany();
	}

	public createFromTemplate(planTemplate: PlanTemplate, coachId: number, athleteId: number, startDate: Date, min: number, max: number, scheduledMessage: string) {
		const messageDate = new Date();
		messageDate.setHours(messageDate.getHours() + 1);
		return this.save({
			planTemplateId: planTemplate.planTemplateId,
			name: planTemplate.name,
			eventId: planTemplate.eventId,
			coachId,
			athleteId,
			min,
			max,
			startDate,
			scheduledMessage,
			messageDate
		});
	}

	public async getLastPlanByAthlete(athleteId: number): Promise<Plan> {
		return this.findOne({
			where: {
				athleteId,
				isActive: true,
			},
			order: {
				planId: 'DESC'
			}
		});
	}

	public async getMilesPerWeeks(planId: number): Promise<any> {
		const sql = `
			WITH t AS (
				SELECT SUM(w.distance) as distance,
				SUM(w.time)/60 as time,
					   pw.number_of_week  as week,
					   pw.number_of_phase as phase
				FROM plan.workout w
						INNER JOIN plan.plan_week pw USING (plan_week_id)
						LEFT JOIN plan.user_pace pace ON (pace.pace_id = w.pace_id and pace.plan_id = pw.plan_id)
				WHERE pw.plan_id = $1
				GROUP BY week, phase
				ORDER BY week
			)
			SELECT
				   row_number() over () as number,
				   *
			FROM t
		`;

		return await this.query(sql, [planId]);
	}

	public async getCompletedMilesPerWeeks(planId: number, numberOfCurrentWeek): Promise<any> {
		const sql = `
			WITH t AS (
				SELECT SUM(CASE WHEN (w.workout_status_id=2 or w.workout_status_id=4) THEN w.distance ELSE 0 END) as distance,
				SUM(CASE WHEN (w.workout_status_id=2 or w.workout_status_id=4) THEN w.moving_time ELSE 0 END)/60 as time,
					   pw.number_of_week  as week,
					   pw.number_of_phase as phase
				FROM plan.workout w
						INNER JOIN plan.plan_week pw USING (plan_week_id)
				WHERE pw.plan_id = $1 and pw.number_of_week <= $2
				GROUP BY week, phase
				ORDER BY week
			)
			SELECT
				   row_number() over () as number,
				   *
			FROM t
		`;

		return await this.query(sql, [planId, numberOfCurrentWeek]);
	}

	public async getFullPlanByAthlete(athleteId: number, includeInactive: boolean): Promise<Plan> {
		let query = this.createQueryBuilder('plan')
			.leftJoinAndSelect('plan.event', 'event')
			.leftJoinAndSelect('plan.coach', 'coach')
			.leftJoinAndSelect('coach.coachInfo', 'coachInfo')
			.leftJoinAndSelect('plan.planWeeks', 'planWeeks')
			.leftJoinAndSelect('planWeeks.phase', 'phase')
			.leftJoinAndSelect('planWeeks.workouts', 'workouts')
			.leftJoinAndSelect('workouts.workoutType', 'workoutType')
			.leftJoinAndSelect('workouts.workoutStatus', 'workoutStatus')
			.leftJoinAndSelect('workouts.message', 'message')
			.leftJoinAndSelect('workouts.pace', 'pace')
			.where(`plan.athleteId=${athleteId}`);

		if (!includeInactive) {
			query = query.andWhere('plan.isActive=TRUE');
		}

		return query
			.orderBy({
				'plan.planId': 'DESC',
				'planWeeks.numberOfPhase': 'ASC',
				'planWeeks.numberOfWeek': 'ASC',
				'workouts.date': 'ASC',
				'message.messageId': 'ASC',
			})
			.getOne();
	}

	public async getPlanListByCoach(coachId: number): Promise<{
		plan_template_id: number;
		name: number;
		amount: number;
	}[]> {
		const sql = `
			SELECT p.plan_template_id, MAX(pt.name) as name, COUNT(DISTINCT(athlete_id)) as amount
			FROM plan.plan p
			LEFT JOIN "user"."user" u ON u.user_id=p.athlete_id
			LEFT JOIN "plan"."plan_template" pt ON pt.plan_template_id=p.plan_template_id
			WHERE p.coach_id = ${coachId} and p.is_active=true and u.is_active=true and u.user_type_id=${UserType.ATHLETE} and u.is_paid=true
			GROUP BY p.plan_template_id
			ORDER BY p.plan_template_id ASC
		`;

		return await this.query(sql);
	}

	public async listOfAssignedCustomPlans(coachId: number): Promise<{ plan_template_id; count }[]> {
		const sql = `
			SELECT
				plan.plan_template_id,
				count(distinct plan.plan_id)
			FROM "user"."user" u
			LEFT JOIN plan.plan plan ON (plan.coach_id = u.user_id)
			WHERE u.user_id = ${coachId} and plan.plan_template_id > 6 and plan.is_active = true
			GROUP BY plan.plan_template_id
		`;

		const data = await this.query(sql);

		if (!data) {
			return [];
		}

		return data;
	}

	public endPlan(planId: number) {
		return this.update(planId, {
			isActive: false,
		});
	}

	public messageSent(planId: number) {
		return this.update(planId, {
			messageSent: true,
		});
	}

	public updateWelcomeMessageByIds(planIds, welcomeMessage) {
		const messageDate = new Date();
		messageDate.setHours(messageDate.getHours() + 1);
		return this.update({planId: In(planIds)}, {
			scheduledMessage: welcomeMessage,
			messageDate
		});
	}

	public endAllPlansByUser(athleteId: number) {
		return this.update({
			athleteId,
			isActive: true,
		}, {
			isActive: false
		});
	}

	public moveAthletePlansToCoach(athleteId: number, coachId: number) {
		return this.update({
			athleteId,
		}, {
			coachId
		});
	}

	public async getMaxPlanWorkoutDate(planId: number): Promise<any> {
		const sql = `
			SELECT max(w."date") AS "PlanWorkoutMaxDate"
			FROM "plan"."plan" p
			INNER JOIN "plan"."plan_week" pw ON pw."plan_id" = p."plan_id"
			INNER JOIN "plan"."workout" w ON w."plan_week_id" = pw."plan_week_id"
			WHERE p."plan_id" = ${planId}
		`;

		const data = await this.query(sql);
		return data[0].PlanWorkoutMaxDate;
	}

	public async getPendingMessagePlans(date: Date = new Date()): Promise<Plan[]> {
		return this.createQueryBuilder('plan')
			.leftJoinAndSelect('plan.coach', 'coach')
			.leftJoinAndSelect('plan.athlete', 'athlete')
			.where('plan.scheduledMessage IS NOT NULL')
			.andWhere('plan.messageSent = false')
			.andWhere('plan.messageDate <= :date', { date })
			.getMany();
	}
}
