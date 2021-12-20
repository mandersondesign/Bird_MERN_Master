import { EntityRepository, In, Repository } from 'typeorm';
import Workout from '../../models/plan/workout';
import WorkoutType from '../../models/plan/workout_type';
import PlanWeek from '../../models/plan/plan_week';
import WorkoutTemplate from '../../models/plan/workout_template';
import WorkoutStatus from '../../models/plan/workout_status';

const DEFAULT_UTC_HOUR = 23;

@EntityRepository(Workout)
export default class WorkoutRepository extends Repository<Workout> {
	public createFromTemplate(planWeek: PlanWeek, workoutTemplates: WorkoutTemplate[]) {
		let hasTempo = false;
		let hasSpeed = false;
		let hasLong = false;

		return this.save(workoutTemplates.map((workoutTemplate) => { //eslint-disable-line
			let isMarkedAsKey = false;
			if (workoutTemplate.workoutTypeId === WorkoutType.TEMPO && !hasTempo) {
				isMarkedAsKey = true;
				hasTempo = true;
			} else if (workoutTemplate.workoutTypeId === WorkoutType.SPEED && !hasSpeed) {
				isMarkedAsKey = true;
				hasSpeed = true;
			} else if (workoutTemplate.workoutTypeId === WorkoutType.LONG_RUN && !hasLong) {
				isMarkedAsKey = true;
				hasLong = true;
			}

			return {
				workoutTemplateId: workoutTemplate.workoutTemplateId,
				planWeekId: planWeek.planWeekId,
				name: workoutTemplate.name,
				workoutTypeId: workoutTemplate.workoutTypeId,
				description: workoutTemplate.description,
				distance: workoutTemplate.distance,
				time: workoutTemplate.time,
				paceId: workoutTemplate.paceId,
				date: (workoutTemplate as any).date,
				scheduledMessage: workoutTemplate.scheduledMessage,
				isMarkedAsKey,
			};
		}));
	}

	public createWithoutTemplte({
		planWeekId,
		name,
		workoutTypeId,
		description,
		distance,
		time,
		paceId,
		date,
		isMarkedAsKey = false,
		scheduledMessage
	}): Promise<Workout> {
		return this.save({
			planWeekId,
			name,
			workoutTypeId,
			description,
			distance,
			time,
			paceId,
			date,
			isMarkedAsKey,
			scheduledMessage
		});
	}

	public findById(workoutId: number): Promise<Workout> {
		return this.createQueryBuilder('workout')
			.leftJoinAndSelect('workout.planWeek', 'planWeek')
			.leftJoinAndSelect('planWeek.plan', 'plan')
			.leftJoinAndSelect('workout.workoutStatus', 'workoutStatus')
			.leftJoinAndSelect('workout.workoutType', 'workoutType')
			.leftJoinAndSelect('workout.pace', 'pace')
			.leftJoinAndSelect('pace.userPace', 'userPace', 'userPace.planId=plan.planId')
			.leftJoinAndSelect('workout.message', 'message', 'message.workoutId=workout.workoutId')
			.where(`workout.workoutId='${workoutId}'`)
			.getOne();
	}

	public setStatus(workoutId: number, workoutStatusId: number) {
		return this.update(workoutId, {
			workoutStatusId,
		});
	}

	public setMarkedAsKeyStatus(workoutId: number, isMarkedAsKey: boolean) {
		return this.update(workoutId, {
			isMarkedAsKey,
		});
	}

	public setLikeStatus(workoutId: number, isLiked: boolean) {
		return this.update(workoutId, {
			isLiked,
		});
	}

	public updateById(workoutId: number, {
		name,
		description,
		distance,
		time,
		paceId,
		workoutTypeId,
		scheduledMessage
	}) {
		return this.update(workoutId, {
			name,
			description,
			distance,
			time,
			paceId,
			workoutTypeId,
			scheduledMessage
		});
	}

	public updateDate(workoutId: number, date) {
		return this.update(workoutId, {
			date,
		});
	}

	public listOfWorkoutsForCurrentHour(date = new Date()): Promise<Workout[]> {
		const utcHour = date.getUTCHours();
		let timeCondition = `coach.notification_utc_hour=${utcHour}`;
		if (utcHour === DEFAULT_UTC_HOUR) {
			timeCondition += ' or coach.notification_utc_hour is null';
		}

		return this.createQueryBuilder('workout')
			.leftJoinAndSelect('workout.planWeek', 'planWeek')
			.leftJoinAndSelect('planWeek.plan', 'plan')
			.leftJoinAndSelect('plan.athlete', 'athlete')
			.leftJoinAndSelect('plan.coach', 'coach')
			.leftJoinAndSelect('athlete.stravaAuth', 'stravaAuth')
			.where(`workout.date='${date.toLocaleString('en-US').split(',')[0]}' and
				athlete.is_active=true and plan.is_active=true and (${timeCondition})`)
			.getMany();
	}

	public listOfWorkoutsForNextHour(date = new Date()): Promise<Workout[]> {

		const utcHour = (date.getUTCHours() + 1) % 24; // eslint-disable-line
		let timeCondition = `coach.notification_utc_hour=${utcHour}`;
		if (utcHour === DEFAULT_UTC_HOUR) {
			timeCondition += ' or coach.notification_utc_hour is null';
		}

		return this.createQueryBuilder('workout')
			.leftJoinAndSelect('workout.planWeek', 'planWeek')
			.leftJoinAndSelect('planWeek.plan', 'plan')
			.leftJoinAndSelect('plan.athlete', 'athlete')
			.leftJoinAndSelect('plan.coach', 'coach')
			.innerJoinAndSelect('athlete.stravaAuth', 'stravaAuth')
			.where(`workout.date='${date.toLocaleString('en-US').split(',')[0]}' and
				athlete.is_active=true and plan.is_active=true and (${timeCondition})`)
			.getMany();
	}

	public listOfWorkoutsForDate(date): Promise<Workout[]> {
		return this.createQueryBuilder('workout')
			.leftJoinAndSelect('workout.planWeek', 'planWeek')
			.leftJoinAndSelect('planWeek.plan', 'plan')
			.leftJoinAndSelect('plan.athlete', 'athlete')
			.where('workout.date = :date', { date })
			.andWhere('athlete.is_active = :isActive', { isActive: true })
			.andWhere('plan.is_active = :isActive', { isActive: true })
			.getMany();
	}

	public getFullWorkoutById(id): Promise<Workout> {
		return this.createQueryBuilder('workout')
			.leftJoinAndSelect('workout.planWeek', 'planWeek')
			.leftJoinAndSelect('planWeek.plan', 'plan')
			.leftJoinAndSelect('plan.athlete', 'athlete')
			.where(`workout.workoutId='${id}' and athlete.isActive=true and plan.isActive=true`)
			.getOne();
	}

	public deleteByWeekId(planWeekId: number) {
		return this.delete({
			planWeekId,
		});
	}

	public listOfWorkoutsForCurrentWeek(monday: Date, sunday: Date): Promise<Workout[]> {
		return this.createQueryBuilder('workout')
			.leftJoinAndSelect('workout.planWeek', 'planWeek')
			.leftJoinAndSelect('planWeek.plan', 'plan')
			.leftJoinAndSelect('plan.athlete', 'athlete')
			.where(`workout.date>='${monday.toLocaleString('en-US').split(',')[0]}' and
				workout.date<'${sunday.toLocaleString('en-US').split(',')[0]}' and
				athlete.is_active=true and plan.is_active=true and
				workout.workout_type_id != ${WorkoutType.REST}`)
			.getMany();
	}

	public async completeWorkout(workoutId: number, {
		workoutStatusId,
		completedDistance,
		avgPace
	}) {
		return this.update(Number(workoutId), {
			workoutStatusId,
			completedDistance,
			avgPace,
		});
	}

	public setCompletedDistance(workoutId: number, completedDistance: number) {
		return this.update(Number(workoutId), {
			completedDistance,
			hasResult: true,
		});
	}

	public setAvgPace(workoutId: number, avgPace: number) {
		return this.update(Number(workoutId), {
			avgPace,
			hasResult: true,
		});
	}

	public setMovingTime(workoutId: number, movingTime) {
		return this.update(Number(workoutId), {
			movingTime: movingTime ? parseInt(movingTime, 10) : null,
			hasResult: true,
		});
	}

	public async match({ activityId, workoutId }) {
		return this.update({
			workoutId,
		}, {
			activityId,
		});
	}

	public async setStravaActivitiesCount(workoutId, stravaActivitiesCount) {
		return this.update({
			workoutId,
		}, {
			stravaActivitiesCount,
		});
	}

	public async clean(workoutId) {
		return this.update({
			workoutId,
		}, {
			hasResult: false,
			activityId: null,
			workoutStatusId: WorkoutStatus.NO_RESULTS,
			avgPace: null,
			movingTime: null,
			completedDistance: null,
		});
	}

	public updateWorkoutMessage(workoutIds, message) {
		return this.update({ workoutId: In(workoutIds) }, {
			scheduledMessage: message
		});
	}

	public listOfWorkoutsForStravaActivity(date: Date, stravaAthleteId: number): Promise<Workout[]> {

		return this.createQueryBuilder('workout')
			.leftJoinAndSelect('workout.planWeek', 'planWeek')
			.leftJoinAndSelect('planWeek.plan', 'plan')
			.leftJoinAndSelect('plan.athlete', 'athlete')
			.leftJoinAndSelect('athlete.stravaAuth', 'auth')
			.where(`workout.date='${date.toLocaleString('en-US').split(',')[0]}' and
				athlete.is_active=true and plan.is_active=true and auth.strava_athlete_id=${stravaAthleteId}`)
			.getMany();
	}

	public getWorkoutsByPlanWeekId(planWeekId): Promise<Workout[]> {
		return this.createQueryBuilder('workout')
			.where(`workout.plan_week_id=${planWeekId}`)
			.getMany();
	}

	public updateWorkoutMessageById(workoutId, message): Promise<any> {
		return this.update({ workoutId }, {
			scheduledMessage: message
		});
	}

}
