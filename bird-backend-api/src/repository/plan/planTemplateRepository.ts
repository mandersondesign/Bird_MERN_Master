import {EntityRepository, Repository, IsNull} from 'typeorm';
import PlanTemplate from '../../models/plan/plan_template';
import WorkoutType from '../../models/plan/workout_type';

@EntityRepository(PlanTemplate)
export default class PlanTemplateRepository extends Repository<PlanTemplate> {
	public async getDaysPerWeek(planTemplateId: number): Promise<any> {
		const sql = `
            WITH t AS (
                SELECT
                    pt.plan_template_id,
                    pwt.plan_week_template_id,
                    count(wt) as count_per_week
				FROM plan.plan_template pt
						INNER JOIN plan.plan_phase_template ppt USING (plan_template_id)
                        INNER JOIN plan.plan_week_template pwt USING (plan_phase_template_id)
                        INNER JOIN plan.workout_template wt USING (plan_week_template_id)
                WHERE wt.workout_type_id != ${WorkoutType.REST} and pt.plan_template_id = ${planTemplateId}
                GROUP BY pt.plan_template_id, pwt.plan_week_template_id
            )
            SELECT max(t.count_per_week)
            FROM t
		`;

		const data = await this.query(sql);

		return data[0].max;
	}

	public async getAmoutOfWeek(planTemplateId: number): Promise<any> {
		const sql = `
            -- Week count in Plan
			SELECT count(*) FROM "plan"."plan_phase_template" as ppt
			INNER JOIN "plan"."plan_week_template" as pwt ON  ppt.plan_phase_template_id=pwt.plan_phase_template_id
			WHERE ppt.plan_template_id=${planTemplateId};
		`;

		const data = await this.query(sql);

		return data[0].count;
	}

	public findById(planTemplateId: number): Promise<PlanTemplate> {
		return this.createQueryBuilder('plan_template')
			.leftJoinAndSelect('plan_template.planPhaseTemplates', 'planPhaseTemplates')
			.leftJoinAndSelect('planPhaseTemplates.planWeekTemplates', 'planWeekTemplates')
			.leftJoinAndSelect('planWeekTemplates.workoutTemplates', 'workoutTemplates')
			// .leftJoinAndSelect('workoutTemplates.workoutType', 'workoutType')
			.where(`plan_template.planTemplateId=${planTemplateId}`)
			.orderBy({
				'planPhaseTemplates.numberOfPhase': 'ASC',
				'planWeekTemplates.numberOfWeek': 'ASC',
				'workoutTemplates.dayNumber': 'ASC',
			})
			.getOne();
	}

	public async findByName(coachId: number, name: string): Promise<PlanTemplate> {
		if (!name) {
			return null;
		}

		const sql = `SELECT plan_template_id
					FROM "plan"."plan_template"
					WHERE lower(name) = $1 and is_active=true and coach_id=$2`;

		const userData = await this.query(sql, [name.toLowerCase().trim(), coachId]);

		if (!userData.length) {
			return null;
		}

		return this.findOne(userData[0].plan_template_id);
	}

	public async findByNameInSystemTemplates(name: string): Promise<PlanTemplate> {
		if (!name) {
			return null;
		}

		const sql = `SELECT plan_template_id
					FROM "plan"."plan_template"
					WHERE lower(name) = $1 and is_active=true and coach_id is null`;

		const userData = await this.query(sql, [name.toLowerCase().trim()]);

		if (!userData.length) {
			return null;
		}

		return this.findOne(userData[0].user_id);
	}

	public list(coachId): Promise<PlanTemplate[]> {
		return this.find({
			where: [{
				coachId,
				isActive: true,
			}, {
				coachId: IsNull()
			}]
		});
	}

	public async listByCoach(
		coachId,
		sortField = 'last_update',
		sortType : 'ASC' | 'DESC' = 'DESC'
	): Promise<any[]> {

		const sql = `SELECT pt.plan_template_id, MAX(pt.name) as name, MIN(pt.last_update) as last_update, count(pwt)
			FROM "plan"."plan_template" as pt
			LEFT JOIN "plan"."plan_phase_template" as ppt ON  ppt.plan_template_id=pt.plan_template_id
			LEFT JOIN "plan"."plan_week_template" as pwt ON  ppt.plan_phase_template_id=pwt.plan_phase_template_id
			WHERE pt.coach_id=${coachId} and pt.is_active=true
			GROUP BY pt.plan_template_id
			ORDER BY ${sortField} ${sortType}
		`;

		const data = await this.query(sql);

		return data;
	}

	public getAmountOfCoachTemplates(coachId): Promise<number> {
		return this.count({
			coachId,
			isActive: true,
		});
	}

	public search(coachId: number, currentPage: number, limit: number, search?: string): Promise<PlanTemplate[]> {
		const query = this.createQueryBuilder('plan_template');

		query.where(`(plan_template.coach_id=${coachId} and plan_template.is_active=true)`);

		if (search) {
			query.andWhere('plan_template.name ILIKE :search', { search: `%${search}%` });
		}

		query.take(limit)
			.skip((currentPage - 1) * limit)
			.orderBy('plan_template.planTemplateId', 'DESC');

		return query.getMany();
	}

	public createNewTemplate({
		name,
		coachId,
		scheduledMessage
	}) : Promise<PlanTemplate>{
		return this.save({
			coachId,
			name,
			scheduledMessage,
		});
	}

	public deleteById(planTemplateId: number){
		return this.update(planTemplateId, {
			isActive: false,
		});
	}

	public updateById(planTemplateId: number, {
		name,
		scheduledMessage
	}){
		return this.update(planTemplateId, {
			name,
			scheduledMessage
		});
	}

	public updateDate(planTemplateId: number){
		return this.update(planTemplateId, {
			lastUpdate: new Date(),
		});
	}
}

