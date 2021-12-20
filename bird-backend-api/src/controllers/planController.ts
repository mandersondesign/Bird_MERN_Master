import { NextFunction, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import * as converter from 'number-to-words';
import IRequest from '../interfaces/IRequest';
import MilesPerWeeksTransformer from '../transformers/milesPerWeeks';
import MilesPerDayTransformer from '../transformers/milesPerDay';
import PlanWeekTransformer from '../transformers/planWeek';
import PlanWeekTemplateTransformer from '../transformers/planWeekTemplate';
import PlanMetaTransformer from '../transformers/planMeta';
import PlanService from '../services/planService';
import PlanTransformer from '../transformers/plan';
import PlanTemplate from '../models/plan/plan_template';
import PlanTemplateTransformer from '../transformers/planTemplate';
import PlanPhaseTemplateTransformer from '../transformers/planPhaseTemplate';
import UserPaceTransformer from '../transformers/userPace';
import WorkoutStatus from '../models/plan/workout_status';
import { SortType } from '../shared/enums';

export default class PlanController {

	public async getRecommendedPlan (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			const plan = await PlanService.getRecommendedPlan(currentUser, {
				eventId: Number(req.query.event_id),
				pastExperienceId: Number(req.query.past_experience_id),
				milesPerWeekId: Number(req.query.miles_per_week_id),
				longDistanceId: Number(req.query.long_distance_id),
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: {
					plan: {
						name: plan.planName,
					},
					amount_of_week: plan.amountOfWeek, // eslint-disable-line
					amount_of_week_string: converter.toWords(plan.amountOfWeek), // eslint-disable-line
					days_per_week: plan.daysPerWeek, // eslint-disable-line
					days_per_week_string: converter.toWords(plan.daysPerWeek), // eslint-disable-line
				}
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getWeeksMilesData (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const userAlias = req.params.alias as number | 'me';

			const data = await PlanService.getWeeksMilesData(currentUser, userAlias);
			const completedData = await PlanService.getWeeksMilesCompletedData(currentUser, userAlias);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: data.map((item) => MilesPerWeeksTransformer.transform(item)),
				completed_data: completedData.map((item) => MilesPerWeeksTransformer.transform(item)), // eslint-disable-line
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getPlanChart (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const userAlias = req.params.alias as number | 'me';

			const { data, completed } = await PlanService.getDataForPlanChart(currentUser, userAlias);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: data.map((item) => MilesPerDayTransformer.transform(item)),
				completed_data: completed.map((item) => MilesPerDayTransformer.transform(item)), // eslint-disable-line
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getDaysMilesData (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const weekId = Number(req.params.id);

			const planWeek = await PlanService.getFullPlanWeekById(currentUser, weekId);

			const week = [1, 2, 3, 4, 5, 6, 7]; // eslint-disable-line

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: week.map((day) => {
					const workout = planWeek.workouts.find((w) => (new Date(`${w.date}T00:00:00`).getDay() || 7) === day);

					return MilesPerDayTransformer.transform({
						day,
						distance: workout ? workout.distance : 0,
						week: planWeek.numberOfWeek,
						time: workout ? workout.time : 0,
					});
				}),
				completed_data: week.map((day) => { // eslint-disable-line
					const workout = planWeek.workouts.find((w) => (new Date(`${w.date}T00:00:00`).getDay() || 7) === day);
					let distance = 0;
					let time = workout ? (workout.movingTime || 0) : null;
					let hasWorkout = false;
					if (workout && workout.completedDistance) {
						distance = workout.completedDistance;
						hasWorkout = true;
					} else if (workout && (workout.workoutStatusId === WorkoutStatus.DID_IT || workout.workoutStatusId === WorkoutStatus.PARTIALLY_DONE)) {
						distance = workout.distance;
						time = time || workout.time || 0;
						hasWorkout = true;
					} else if (workout && new Date(`${workout.date}T00:00:00`) <= new Date()) {
						hasWorkout = true;
						distance = -1;
					}

					return {
						hasWorkout,
						...MilesPerDayTransformer.transform({
							day,
							distance,
							week: planWeek.numberOfWeek,
							time: time !== null ? time : -1,
						})
					};
				}).filter((d) => d.hasWorkout),
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getPlanByUser (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const userAlias = req.params.alias as number | 'me';
			const includeInactive = req.query.include_inactive === '1';

			const { plan, program, phases, meta, userInfo, status, planEndDate } = await PlanService.getPlanByUser(currentUser, userAlias, includeInactive);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				meta: PlanMetaTransformer.transform(meta),
				data: PlanTransformer.transform(plan, userInfo, phases, meta.miles.total, program, status, planEndDate),
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getMetaForPlan (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const userAlias = req.params.alias as number | 'me';

			const { meta } = await PlanService.getPlanByUser(currentUser, userAlias, false);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: PlanMetaTransformer.transform(meta),
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getCurrentWeek (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const userAlias = req.params.alias as number | 'me';

			const [currentWeek, isReadyForAthlete] = await PlanService.getWeekByNumber(currentUser, userAlias, null);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: {
					is_ready_for_athlete: Boolean(isReadyForAthlete), // eslint-disable-line
					week: PlanWeekTransformer.transform(currentWeek)
				}
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getWeekByNumber (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const userAlias = req.params.alias as number | 'me';
			const weekNumber = req.params.week_number && !isNaN(Number(req.params.week_number)) ? Number(req.params.week_number) : null;

			const [currentWeek, isReadyForAthlete] = await PlanService.getWeekByNumber(currentUser, userAlias, weekNumber);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: {
					is_ready_for_athlete: Boolean(isReadyForAthlete), // eslint-disable-line
					week: PlanWeekTransformer.transform(currentWeek)
				}
			});
		} catch (error) {
			return next(error);
		}
	}

	public async listOfTemplates (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planTemplates : PlanTemplate[] = await PlanService.listOfTemplates(currentUser.userId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: {
					plan_templates: planTemplates.map((pt) => PlanTemplateTransformer.transform(pt)), // eslint-disable-line
				}
			});
		} catch (error) {
			return next(error);
		}
	}

	public async listOfCoachTemplates (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const sortField = req.query.sort as string;
			const sortType = req.query.sort_type as SortType;
			const planTemplates : PlanTemplate[] = await PlanService.listOfCoachTemplates(currentUser.userId, sortField, sortType);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: {
					plan_templates: planTemplates.map((pt) => PlanTemplateTransformer.transform(pt)), // eslint-disable-line
				}
			});
		} catch (error) {
			return next(error);
		}
	}

	public async createNewTemplate (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const name = req.body.name;
			const message = req.body.message;

			const planTemplate = await PlanService.createNewTemplate(currentUser, name, message);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				plan_template: planTemplate ? PlanTemplateTransformer.transform(planTemplate) : null, // eslint-disable-line
			});
		} catch (error) {
			return next(error);
		}
	}

	public async addPhaseToTemplate (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planTemplateId = req.params.plan_template_id;
			const name = req.body.name;

			const planPhaseTemplate = await PlanService.addPhaseToTemplate(currentUser, planTemplateId, name);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				plan_phase_template: planPhaseTemplate ? PlanPhaseTemplateTransformer.transform(planPhaseTemplate) : null, // eslint-disable-line
			});
		} catch (error) {
			return next(error);
		}
	}

	public async updatePhaseTemplate (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planPhaseTemplateId = req.params.phase_id;
			const name = req.body.name;
			const description = req.body.description;

			await PlanService.updatePhaseToTemplate(currentUser, planPhaseTemplateId, {
				name,
				description,
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async deletePhaseTemplate (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planPhaseTemplateId = req.params.phase_id;

			await PlanService.deletePhaseTemplate(currentUser, planPhaseTemplateId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async addWeekToTemplate (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planTemplateId = req.params.plan_template_id;
			const planPhaseTemplateId = req.params.phase_id;

			const week = await PlanService.addWeekToTemplate(currentUser, {
				planTemplateId,
				planPhaseTemplateId
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				plan_week_template: week ? PlanWeekTemplateTransformer.transform(week) : null, // eslint-disable-line
			});
		} catch (error) {
			return next(error);
		}
	}

	public async updateWeekTemplate (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planWeekTemplateId = req.params.week_id;
			const description = req.body.description;

			await PlanService.updatePlanTemplate(currentUser, planWeekTemplateId, {
				description
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async deleteWeekTemplate (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planTemplateId = req.params.plan_template_id;
			const planWeekTemplateId = req.params.week_id;

			await PlanService.deleteWeekTemplate(currentUser, {
				planTemplateId,
				planWeekTemplateId
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async addWorkoutToTemplate (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planWeekTemplateId = req.params.week_id;
			const name = req.body.name;
			const description = req.body.description;
			const workoutTypeId = req.body.workout_type_id;
			const workoutTypeName = req.body.workout_type_name;
			const distance = req.body.distance;
			const time = req.body.time;
			const paceId = req.body.pace_id;
			const dayNumber = req.body.day_number;
			const scheduledMessage = req.body.scheduled_message;

			await PlanService.addWorkoutToTemplate(currentUser, planWeekTemplateId, {
				name,
				workoutTypeId,
				workoutTypeName,
				description,
				distance,
				time,
				paceId,
				dayNumber,
				scheduledMessage
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async updateWorkoutTemplate (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutTemplateId = req.params.workout_id;
			const name = req.body.name;
			const description = req.body.description;
			const workoutTypeId = req.body.workout_type_id;
			const workoutTypeName = req.body.workout_type_name;
			const distance = req.body.distance;
			const time = req.body.time;
			const paceId = req.body.pace_id;
			const scheduledMessage = req.body.scheduled_message;

			await PlanService.updateWorkoutTemplate(currentUser, workoutTemplateId, {
				name,
				workoutTypeId,
				workoutTypeName,
				description,
				distance,
				time,
				paceId,
				scheduledMessage
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async deleteWorkoutTemplate (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutTemplateId = req.params.workout_id;

			await PlanService.deleteWorkoutTemplate(currentUser, workoutTemplateId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getPlanTemplateById (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planTemplateId = req.params.plan_template_id;

			const planTemplate = await PlanService.getPlanTemplateById(currentUser, planTemplateId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				plan_template: planTemplate ? PlanTemplateTransformer.transform(planTemplate) : null, // eslint-disable-line
			});
		} catch (error) {
			return next(error);
		}
	}

	public async deletePlanTemplateById (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planTemplateId = req.params.plan_template_id;

			await PlanService.deletePlanTemplateById(currentUser, planTemplateId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async updatePlanTemplateById (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planTemplateId = Number(req.params.plan_template_id);
			const name = req.body.name;
			const message = req.body.message;

			await PlanService.updatePlanTemplateById(currentUser, planTemplateId, name, message);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async updateSortInTemplate (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planTemplateId = Number(req.params.plan_template_id);
			const phases = req.body.phases;

			await PlanService.updateSortInTemplate(currentUser, planTemplateId, phases);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async updateSortInPlan (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planId = Number(req.params.plan_id);
			const phases = req.body.phases;

			await PlanService.updateSortInPlan(currentUser, planId, phases);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async updateSortInWeek (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const weekId = Number(req.params.id);
			const workouts = req.body.workouts;

			await PlanService.updateSortInWeek(currentUser, weekId, workouts);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}


	public async deleteWeek (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planId = Number(req.params.plan_id);
			const weekId = Number(req.params.week_id);

			await PlanService.deleteWeek(currentUser, planId, weekId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async copyWeek (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planId = Number(req.params.plan_id);
			const weekId = Number(req.params.week_id);

			const week = await PlanService.copyWeek(currentUser, planId, weekId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				week: week ? PlanWeekTransformer.transform(week) : null,
			});
		} catch (error) {
			return next(error);
		}
	}

	public async addWeekToPlan (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planId = Number(req.params.plan_id);
			const description = req.body.description;

			const week = await PlanService.addWeekToPlan(currentUser, planId, description);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				week: week ? PlanWeekTransformer.transform(week) : null,
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getPacesByPlanId (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planId = Number(req.params.plan_id);

			const paces = await PlanService.getPacesByPlanId(currentUser, planId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				paces: (paces || []).map((p) => UserPaceTransformer.transform(p)),
			});
		} catch (error) {
			return next(error);
		}
	}

	public async updatePacesByPlanId (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planId = Number(req.params.plan_id);
			const paces = req.body.paces;

			await PlanService.updatePacesByPlanId(currentUser, planId, paces);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK'
			});
		} catch (error) {
			return next(error);
		}
	}

	public async endPlanById (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planId = Number(req.params.plan_id);

			await PlanService.endPlanById(currentUser, planId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async updateWorkoutTemplateMessage(req: IRequest, res: Response, next: NextFunction) {
		try {
			const workoutTemplateId = Number(req.params.workout_id);
			const scheduledMessage = req.body.scheduled_message;

			await PlanService.updateWorkoutTemplateMessageById(workoutTemplateId, scheduledMessage);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}
}
