import {EntityRepository, Repository} from 'typeorm';
import PlanWeek from '../../models/plan/plan_week';
import PlanWeekTemplate from '../../models/plan/plan_week_template';
import PlanPhase from '../../models/plan/phase';

@EntityRepository(PlanWeek)
export default class PlanWeekRepository extends Repository<PlanWeek> {
	public createFromTemplate(planId: number, planPhase: PlanPhase, planWeekTemplates: PlanWeekTemplate[]): Promise<PlanWeek[]> {
		return this.save(planWeekTemplates.map((planWeekTemplate) => ({
			planId,
			phaseId: planPhase.phaseId,
			numberOfWeek: planWeekTemplate.numberOfWeek,
			numberOfPhase: planPhase.numberOfPhase,
			description: planWeekTemplate.description,
		})));
	}

	public async getPlanWeekByNumberOfWeek(planId: number, numberOfWeek: number): Promise<PlanWeek> {
		return this.createQueryBuilder('plan_week')
			.leftJoinAndSelect('plan_week.phase', 'phase')
			.leftJoinAndSelect('plan_week.workouts', 'workouts')
			.leftJoinAndSelect('workouts.workoutType', 'workoutType')
			.where(`plan_week.plan_id=${planId} AND plan_week.number_of_week=${numberOfWeek}`)
			.orderBy({
				'workouts.date': 'ASC',
			})
			.getOne();
	}

	public async getFullPlanWeekById(planWeekId: number): Promise<PlanWeek> {
		return this.createQueryBuilder('plan_week')
			.leftJoinAndSelect('plan_week.plan', 'plan')
			.leftJoinAndSelect('plan_week.phase', 'phase')
			.leftJoinAndSelect('plan_week.workouts', 'workouts')
			.leftJoinAndSelect('workouts.workoutType', 'workoutType')
			.where(`plan_week.plan_week_id=${planWeekId}`)
			.orderBy({
				'workouts.date': 'ASC',
			})
			.getOne();
	}

	public async getById(weekId: number): Promise<PlanWeek> {
		return this.createQueryBuilder('plan_week')
			.leftJoinAndSelect('plan_week.plan', 'plan')
			.where(`plan_week.plan_week_id=${weekId}`)
			.getOne();
	}

	public updateById(weekId: number, {
		description,
	}){
		return this.update(weekId, {
			description,
		});
	}

	public async getLastWeekByPlanId(planId: number): Promise<PlanWeek> {
		return this.createQueryBuilder('plan_week')
			.where(`plan_week.plan_id=${planId}`)
			.orderBy({
				'plan_week.number_of_week': 'DESC',
			})
			.getOne();
	}

	public addWeekToPlan(planId: number, phaseId: number, numberOfWeek: number, numberOfPhase: number, description: string): Promise<PlanWeek> {
		return this.save({
			planId,
			phaseId,
			numberOfWeek,
			numberOfPhase,
			description,
		});
	}

	public updateNumberOfWeek(planWeekId: number, numberOfPhase: number, numberOfWeek: number){
		return this.update(planWeekId, {
			numberOfPhase,
			numberOfWeek,
		});
	}

	public deleteById(planWeekId: number) {
		return this.delete(planWeekId);
	}
}
