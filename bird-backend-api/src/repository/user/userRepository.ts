import { EntityRepository, FindOneOptions, In, Repository } from 'typeorm';
import User from '../../models/user/user';
import UserType from '../../models/user/user_type';
import Workout from '../../models/plan/workout';

const MIN_RISK = 3;

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
	public async findByEmail(email: string, options?: FindOneOptions<User>): Promise<User> {
		if (!email) {
			return null;
		}

		const sql = `SELECT user_id
					FROM "user"."user"
					WHERE lower(email) = $1`;

		const userData = await this.query(sql, [email.toLowerCase().trim()]);

		if (!userData.length) {
			return null;
		}

		return this.findOne(userData[0].user_id, options);
	}

	public findById(userId: number): Promise<User> {
		return this.findOne({
			where: { userId },
		});
	}

	public findByPhone(phone: string): Promise<User> {
		return this.findOne({
			where: { phone },
		});
	}

	public findByIds(ids: number[]): Promise<User[]> {
		return this.find({
			where: { userId: In(ids) },
			relations: ['planOfAthlete', 'athleteInvite'],
		});
	}

	public deleteById(userId: number): Promise<any> {
		return this.update(userId, {
			isActive: false,
		});
	}


	public updateById(userId, {
		email,
		firstName,
		lastName,
		isActive = true,
		phone,
		address = undefined,
		city = undefined,
		state = undefined,
		zipCode = undefined,
		country = undefined
	}) {
		return this.update(userId, {
			email: email.toLowerCase().trim(),
			firstName: firstName.trim(),
			lastName: lastName.trim(),
			phone,
			isActive,
			address,
			city,
			state,
			zipCode,
			country
		});
	}

	public updateAvatar(userId, avatar) {
		return this.update(userId, {
			avatar
		});
	}

	public updatePassword(userId, password) {
		return this.update(userId, {
			password
		});
	}

	public acceptPolicy(userId) {
		return this.update(userId, {
			isPolicyAccepted: true,
		});
	}

	public setSmsNotificationStatus(userId, isSmsEnabled) {
		return this.update(userId, {
			isSmsEnabled,
		});
	}

	public findCoachById(userId: number): Promise<User> {
		return this.findOne({
			where: {
				userId,
				userTypeId: UserType.COACH
			},
			relations: ['coachInfo']
		});
	}

	public findAthleteById(userId: number): Promise<User> {
		const query = this.createQueryBuilder('user')
			.leftJoinAndSelect('user.planOfAthlete', 'plan', 'plan.isActive=true')
			.leftJoinAndSelect('user.userInfo', 'userInfo')
			.leftJoinAndSelect('user.athleteInvite', 'athleteInvite')
			.leftJoinAndSelect('user.lastActivity', 'lastActivity')
			.leftJoinAndSelect('lastActivity.lastActivityType', 'lastActivityType')
			.leftJoinAndSelect('userInfo.event', 'event')
			.leftJoinAndSelect('user.stravaAuth', 'stravaAuth')
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere(`user.userId=${userId}`)
			.orderBy({
				'plan.planId': 'DESC',
				'athleteInvite.inviteId': 'DESC',
			});

		return query.getOne();
	}

	public async countWithSearch(search?: string): Promise<number> {
		if (!search) {
			return this.createQueryBuilder('user').getCount();
		}

		return this.createQueryBuilder('user')
			.leftJoinAndSelect('user.userType', 'userType')
			.where('user.firstName ILIKE :search', { search: `%${search}%` })
			.orWhere('user.lastName ILIKE :search', { search: `%${search}%` })
			.orWhere('user.email ILIKE :search', { search: `%${search}%` })
			.orWhere('user.phone ILIKE :search', { search: `%${search}%` })
			.orWhere('userType.name ILIKE :search', { search: `%${search}%` })
			.getCount();
	}

	public findAll(currentPage: number, limit: number, search?: string): Promise<User[]> {
		if (!search) {
			return this.createQueryBuilder('user')
				.leftJoinAndSelect('user.userType', 'userType')
				.leftJoinAndSelect('user.coachPlanToUser', 'coachPlanToUser')
				.leftJoinAndSelect('coachPlanToUser.coachPlan', 'coachPlan')
				.take(limit)
				.skip((currentPage - 1) * limit)
				.orderBy('user.userId', 'DESC')
				.getMany();
		}

		return this.createQueryBuilder('user')
			.leftJoinAndSelect('user.userType', 'userType')
			.leftJoinAndSelect('user.coachPlanToUser', 'coachPlanToUser')
			.leftJoinAndSelect('coachPlanToUser.coachPlan', 'coachPlan')
			.where('user.firstName ILIKE :search', { search: `%${search}%` })
			.orWhere('user.lastName ILIKE :search', { search: `%${search}%` })
			.orWhere('user.email ILIKE :search', { search: `%${search}%` })
			.orWhere('user.phone ILIKE :search', { search: `%${search}%` })
			.orWhere('userType.name ILIKE :search', { search: `%${search}%` })
			.take(limit)
			.skip((currentPage - 1) * limit)
			.orderBy('user.userId', 'DESC')
			.getMany();
	}

	public searchAthletes(currentPage: number, limit: number, coachId: number, search?: string): Promise<User[]> {
		const query = this.createQueryBuilder('user')
			.leftJoinAndSelect('user.planOfAthlete', 'plan')
			.leftJoinAndSelect('user.athleteInvite', 'athleteInvite')
			.leftJoinAndSelect('user.userType', 'userType')
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere('user.isActive=TRUE')
			.andWhere('user.isPaid=TRUE')
			.andWhere(`(plan.coachId=${coachId} or athleteInvite.fromId=${coachId})`);

		if (!search) {
			query
				.take(limit)
				.skip((currentPage - 1) * limit)
				.orderBy('user.userId', 'DESC');
		} else {
			query
				.andWhere(
					'(user.firstName ILIKE :search or user.lastName ILIKE :search or user.email ILIKE :search or user.phone ILIKE :search)',
					{ search: `%${search}%` }
				)
				.take(limit)
				.skip((currentPage - 1) * limit)
				.orderBy('user.userId', 'DESC');
		}

		return query.getMany();
	}

	public completeOnboarding(userId) {
		return this.update(userId, {
			isOnboardingCompleted: true,
		});
	}

	public moveToPaidUser(userId) {
		return this.update(userId, {
			isPaid: true,
		});
	}

	public listOfAllAthletes(
		coachId: number,
		limit = 10,
		currentPage = 1,
		sortField: string,
		sortType: 'ASC' | 'DESC' = 'DESC',
	): Promise<User[]> {
		const query = this.createQueryBuilder('user')
			.leftJoinAndSelect('user.planOfAthlete', 'plan')
			.leftJoinAndSelect('user.athleteInvite', 'athleteInvite')
			.leftJoinAndSelect('user.userInfo', 'userInfo')
			.leftJoinAndSelect('userInfo.event', 'event')
			.leftJoinAndSelect('user.lastActivity', 'lastActivity')
			.leftJoinAndSelect('lastActivity.lastActivityType', 'lastActivityType')
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere('user.isActive=TRUE')
			.andWhere('user.isPaid=TRUE')
			.andWhere(`(plan.coachId=${coachId} or athleteInvite.fromId=${coachId})`)
			.take(limit)
			.skip((currentPage - 1) * limit);

		if (sortField === 'name') {
			query.orderBy({
				'user.firstName': sortType,
				'user.lastName': sortType,
			});
		} else if (sortField === 'risk') {
			query.orderBy({
				'user.preRisk': sortType,
				'user.firstName': 'ASC',
				'user.lastName': 'ASC',
			});
		} else if (sortField === 'date') {
			query.orderBy({
				'userInfo.dateOfRace': {
					order: sortType,
					nulls: sortType.length === 3 ? 'NULLS LAST' : 'NULLS FIRST'
				},
				'user.firstName': 'ASC',
				'user.lastName': 'ASC',
			});
		} else if (sortField === 'activity') {
			query.orderBy({
				'lastActivity.date': {
					order: sortType,
					nulls: 'NULLS LAST'
				},
				'user.userId': sortType,
			});
		} else {
			query.orderBy({
				'user.userId': 'DESC',
			});
		}

		return query.getMany();
	}

	public listAllAthletes(
		coachId: number
	): Promise<User[]> {
		const query = this.createQueryBuilder('user')
			.leftJoinAndSelect('user.planOfAthlete', 'plan')
			.leftJoinAndSelect('user.athleteInvite', 'athleteInvite')
			.leftJoinAndSelect('user.userInfo', 'userInfo')
			.leftJoinAndSelect('userInfo.event', 'event')
			.leftJoinAndSelect('user.lastActivity', 'lastActivity')
			.leftJoinAndSelect('lastActivity.lastActivityType', 'lastActivityType')
			.leftJoinAndSelect('lastActivity.workout', 'workout')
			.leftJoinAndSelect('workout.workoutStatus', 'workoutStatus')
			.leftJoinAndSelect('workout.workoutType', 'workoutType')
			.leftJoinAndSelect('user.messages', 'message')
			.leftJoinAndSelect('message.plan', 'messagePlan')
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere('user.isActive=TRUE')
			.andWhere('user.isPaid=TRUE')
			.andWhere(`(plan.coachId=${coachId} or athleteInvite.fromId=${coachId})`);


		return query.getMany();
	}

	public listOfAthletesByPlan(
		coachId: number,
		limit = 10,
		currentPage = 1,
		sortField: string,
		sortType: 'ASC' | 'DESC' = 'DESC',
		planTemplateId: number
	): Promise<User[]> {

		const date = new Date();
		const day = date.getDay();
		const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? -6 : 1) - day).toLocaleString('en-US').split(',')[0]; // eslint-disable-line
		const sunday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? 0 : 7) - day).toLocaleString('en-US').split(',')[0]; // eslint-disable-line

		const query = this.createQueryBuilder('user')
			.leftJoinAndSelect('user.planOfAthlete', 'plan')
			.leftJoinAndSelect('user.userInfo', 'userInfo')
			.leftJoinAndSelect('userInfo.event', 'event')
			.leftJoinAndSelect('user.lastActivity', 'lastActivity')
			.leftJoinAndSelect('lastActivity.lastActivityType', 'lastActivityType')
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere('user.isActive=TRUE')
			.andWhere('user.isPaid=TRUE')
			.andWhere(`(plan.coachId=${coachId} and plan.isActive=true ${planTemplateId ? 'and plan.planTemplateId=' + planTemplateId : ''})`)
			.take(limit)
			.skip((currentPage - 1) * limit);

		if (sortField === 'name') {
			query.orderBy({
				'user.firstName': sortType,
				'user.lastName': sortType,
			});
		} else if (sortField === 'risk') {
			query.orderBy({
				'user.preRisk': sortType,
				'user.firstName': 'ASC',
				'user.lastName': 'ASC',
			});
		} else if (sortField === 'date') {
			query.orderBy({
				'userInfo.dateOfRace': {
					order: sortType,
					nulls: sortType.length === 3 ? 'NULLS LAST' : 'NULLS FIRST'
				},
				'user.firstName': 'ASC',
				'user.lastName': 'ASC',
			});
		} else if (sortField === 'activity') {
			query.orderBy({
				'lastActivity.date': {
					order: sortType,
					nulls: 'NULLS LAST'
				},
				'user.userId': sortType,
			});
		} else {
			query.orderBy({
				'user.userId': 'DESC',
			});
		}

		query.leftJoinAndSelect('plan.planWeeks', 'week');
		query.leftJoinAndMapMany(
			'week.workouts',
			Workout,
			'workouts',
			`
				week.plan_week_id = workouts.plan_week_id and
				workouts.is_marked_as_key = true and
				workouts.date >= '${monday}' and workouts.date <= '${sunday}'
			`
		);
		query.leftJoinAndSelect('workouts.workoutType', 'workoutType');

		return query.getMany();
	}

	public listOfUnassignedAthletes(coachId: number, limit = 10, currentPage = 1, sortField: string, sortType: 'ASC' | 'DESC' = 'DESC'): Promise<User[]> {
		const query = this.createQueryBuilder('user')
			.innerJoinAndSelect('user.athleteInvite', 'athleteInvite', `athleteInvite.fromId=${coachId}`)
			.leftJoinAndSelect('user.userInfo', 'userInfo')
			.leftJoinAndSelect('userInfo.event', 'event')
			.leftJoinAndSelect('user.planOfAthlete', 'plan', `plan.coachId=${coachId} and plan.isActive=true`)
			.leftJoinAndSelect('user.lastActivity', 'lastActivity')
			.leftJoinAndSelect('lastActivity.lastActivityType', 'lastActivityType')
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere('user.isActive=TRUE')
			.andWhere('user.isPaid=TRUE')
			.andWhere('plan is null')
			.take(limit)
			.skip((currentPage - 1) * limit);



		if (sortField === 'name') {
			query.orderBy({
				'user.firstName': sortType,
				'user.lastName': sortType,
			});
		} else if (sortField === 'risk') {
			query.orderBy({
				'user.preRisk': sortType,
				'user.firstName': 'ASC',
				'user.lastName': 'ASC',
			});
		} else if (sortField === 'date') {
			query.orderBy({
				'userInfo.dateOfRace': {
					order: sortType,
					nulls: sortType.length === 3 ? 'NULLS LAST' : 'NULLS FIRST'
				},
				'user.firstName': 'ASC',
				'user.lastName': 'ASC',
			});
		} else if (sortField === 'activity') {
			query.orderBy({
				'lastActivity.date': {
					order: sortType,
					nulls: 'NULLS LAST'
				},
				'user.userId': sortType,
			});
		} else {
			query.orderBy({
				'user.userId': 'DESC',
			});
		}

		return query.getMany();
	}

	public getTotalAthletesCount(coachId: number): Promise<number> {
		return this.createQueryBuilder('user')
			.leftJoinAndSelect('user.planOfAthlete', 'plan')
			.leftJoinAndSelect('user.athleteInvite', 'athleteInvite')
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere('user.isActive=TRUE')
			.andWhere('user.isPaid=TRUE')
			.andWhere(`(plan.coachId=${coachId} or athleteInvite.fromId=${coachId})`)
			.getCount();
	}

	public getTotalActiveAthletesCount(coachId: number): Promise<number> {
		return this.createQueryBuilder('user')
			.innerJoinAndSelect('user.planOfAthlete', 'plan', `plan.coachId=${coachId} and plan.isActive=true `)
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere('user.isActive=TRUE')
			.andWhere('user.isPaid=TRUE')
			.getCount();
	}

	public getTotalAthletesCountByPlanTemplateId(coachId: number, planTemplateId: number): Promise<number> {
		return this.createQueryBuilder('user')
			.innerJoinAndSelect('user.planOfAthlete', 'plan', `plan.coachId=${coachId} and plan.isActive=true ${planTemplateId ? 'and plan.planTemplateId=' + planTemplateId : ''}`)
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere('user.isActive=TRUE')
			.andWhere('user.isPaid=TRUE')
			.getCount();
	}

	public getTotalUnassignedAthletesCount(coachId: number): Promise<number> {
		return this.createQueryBuilder('user')
			.innerJoinAndSelect('user.athleteInvite', 'athleteInvite', `athleteInvite.fromId=${coachId}`)
			.leftJoinAndSelect('user.planOfAthlete', 'plan', `plan.coachId=${coachId} and plan.isActive=true`)
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere('user.isActive=TRUE')
			.andWhere('user.isPaid=TRUE')
			.andWhere('plan is null')
			.getCount();
	}

	public getUserListReport() {
		return this.query(`
			SELECT
				u.user_id as "User ID",
				u.name as "First Name",
				u.last_name as "Last Name",
				ut.name as "User Type",
				u.email as "Email",
				u.phone as "Phone",
				date(u.created_at) as "Creating date",
				case when u.is_active THEN 'YES' else 'NO' end AS "Active",
				count(coach_plan.plan_id) AS "Acitve Athletes Amount (for coach)",
				CASE WHEN
					count(athlete_plan.plan_id) = 0
					THEN 'NO'  else 'YES'
					end AS "Active plan (for athlete)",
			max(athlete_plan.start_date) as "Start date (for athlete)",
			max(strava_auth.name) as "Strava Account"
			FROM "user"."user" u
			INNER JOIN "user".user_type ut USING (user_type_id)
			LEFT JOIN plan.plan coach_plan ON (coach_plan.coach_id = u.user_id AND coach_plan.is_active)
			LEFT JOIN plan.plan athlete_plan ON (athlete_plan.athlete_id = u.user_id AND athlete_plan.is_active)
			LEFT JOIN strava.auth strava_auth on (strava_auth.user_id = u.user_id)
			WHERE u.user_type_id != 1 and u.is_active
			GROUP BY u.user_id, ut.user_type_id
			ORDER BY u.created_at DESC
		`);
	}

	public getAthletesWithWorkouts() {
		return this.query(`
			SELECT
				u.user_id as "userId",
				count(DISTINCT workout) filter (where workout.workout_status_id = 2 or workout.workout_status_id = 4) AS "count"
			FROM "user"."user" u
			LEFT JOIN plan.plan athlete_plan ON (athlete_plan.athlete_id = u.user_id)
			LEFT JOIN plan.plan_week pw on (pw.plan_id = athlete_plan.plan_id)
			LEFT JOIN plan.workout workout on (pw.plan_week_id = workout.plan_week_id)
			WHERE u.user_type_id = 3
			GROUP BY u.user_id
			ORDER BY u.user_id DESC
		`);
	}

	public async getWorkoutsCount(userId): Promise<number> {
		const res = await this.query(`
			SELECT
				count(DISTINCT workout) filter (where workout.workout_status_id = 2 or workout.workout_status_id = 4) AS "count"
			FROM "user"."user" u
			LEFT JOIN plan.plan athlete_plan ON (athlete_plan.athlete_id = u.user_id)
			LEFT JOIN plan.plan_week pw on (pw.plan_id = athlete_plan.plan_id)
			LEFT JOIN plan.workout workout on (pw.plan_week_id = workout.plan_week_id)
			WHERE u.user_id = ${userId}
		`);

		if (!res || !res.length) {
			return 0;
		}

		return res[0].count;
	}

	public getAthletesWithMissedWorkouts() {
		const date = new Date();
		const day = date.getDay();
		const from = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? -6 : 1) - day); // eslint-disable-line
		const to = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? 0 : 7) - day); // eslint-disable-MAX_LINE

		return this.query(`
			SELECT
				u.user_id as "userId",
				max(athlete_plan.name) as name,
				max(pw.number_of_week) as number_of_week
			FROM "user"."user" u
			LEFT JOIN plan.plan athlete_plan ON (athlete_plan.athlete_id = u.user_id)
			LEFT JOIN plan.plan_week pw on (pw.plan_id = athlete_plan.plan_id)
			LEFT JOIN plan.workout workout on (pw.plan_week_id = workout.plan_week_id)
			WHERE u.user_type_id = 3 and workout.date >= '${from.toLocaleString('en-US').split(',')[0]}' and  workout.date <= '${to.toLocaleString('en-US').split(',')[0]}'
			GROUP BY u.user_id
			HAVING count(DISTINCT workout) filter (where workout.workout_status_id = 1 or workout.workout_status_id = 3) >= 3
		`);
	}

	public getAthletesNotStartedPlan() {
		const date = new Date();
		const day = date.getDay();
		const from = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? -6 : 1) - day); // eslint-disable-line
		const to = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // eslint-disable-MAX_LINE

		return this.query(`
			SELECT
				u.user_id as "userId"
			FROM "user"."user" u
			LEFT JOIN plan.plan athlete_plan ON (athlete_plan.athlete_id = u.user_id)
			LEFT JOIN plan.plan_week pw on (pw.plan_id = athlete_plan.plan_id)
			LEFT JOIN plan.workout workout on (pw.plan_week_id = workout.plan_week_id)
			WHERE pw.number_of_week = 1 and u.user_type_id = 3 and workout.date >= '${from.toLocaleString('en-US').split(',')[0]}' and  workout.date <= '${to.toLocaleString('en-US').split(',')[0]}'
			GROUP BY u.user_id
			HAVING count(DISTINCT workout) = 3 and count(DISTINCT workout) filter (where workout.workout_status_id = 1) = 3
		`);
	}

	public getAthleteEngagementReport() {
		const date = new Date();
		const day = date.getDay();
		const from = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? -6 : 1) - day); // eslint-disable-line
		const to = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? 0 : 7) - day); // eslint-disable-MAX_LINE

		from.setDate(from.getDate() - 1); // BIRD-2232
		to.setDate(to.getDate() - 1); // BIRD-2232

		return this.query(`
			SELECT
				u.user_id as "User ID",
				u.name as "First Name",
				u.last_name as "Last Name",
				u.email as "Email",
				count(DISTINCT workout) AS "Workouts (total)",
				count(DISTINCT workout) filter (where workout.workout_status_id = 2 or workout.workout_status_id = 4) AS "Workouts (with status)",
				count(DISTINCT workout) filter (where workout.is_liked = true) AS "Liked workouts",
				count(DISTINCT workout) filter (where workout.is_marked_as_key = true) AS "Key workouts",
				count(DISTINCT message) filter (where message.is_from_athlete = true)  AS "Messages (from)",
				count(DISTINCT message) filter (where message.is_from_athlete != true)  AS "Messages (to)",
				max(athlete_plan.name) as "Plan name",
				max(athlete_plan.start_date) as "Start date (for athlete)",
				max(coach.email) as "Coach Email",
				max(coach.name) as "Coach First Name",
				max(coach.last_name) as "Coach Last Name"
			FROM "user"."user" u
			LEFT JOIN plan.plan athlete_plan ON (athlete_plan.athlete_id = u.user_id)
			LEFT JOIN plan.plan_week pw on (pw.plan_id = athlete_plan.plan_id)
			LEFT JOIN "user"."user" coach on (coach.user_id = athlete_plan.coach_id)
			LEFT JOIN plan.workout workout on (pw.plan_week_id = workout.plan_week_id)
			LEFT JOIN plan.message message on (workout.worktout_id = message.workout_id)

			WHERE u.user_type_id = 3 and workout.date >= '${from.toLocaleString('en-US').split(',')[0]}' and  workout.date <= '${to.toLocaleString('en-US').split(',')[0]}'
			GROUP BY u.user_id
			ORDER BY u.created_at DESC
		`);
	}

	public async updateRiskByUserId(userId): Promise<number> {
		const date = new Date();
		const day = date.getDay();
		const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? -6 : 1) - day).toLocaleString('en-US').split(',')[0]; // eslint-disable-line
		const now = date.toLocaleString('en-US').split(',')[0]; // eslint-disable-line

		const res = await this.query(`
			SELECT
				plan_id,
				CASE WHEN text ILIKE '%pain%' or text ILIKE '%hurt%' or text ILIKE '%stiff%' or text ILIKE '%injury%' THEN true ELSE false END AS "has_pain",
				CASE WHEN text ILIKE '%pain%' or text ILIKE '%hurt%' or text ILIKE '%stiff%' or text ILIKE '%injury%' THEN 1
					WHEN missed = 1 and partially_done = 1 THEN 1
					WHEN missed = 0 and partially_done <= 1 THEN 3
					WHEN missed <=1 and partially_done <= 2 THEN 2
					ELSE 1
				END AS "risk"
			FROM (
				SELECT
					max(athlete_plan.plan_id) as "plan_id",
					count(DISTINCT workout) filter (where workout.workout_status_id = 1 or workout.workout_status_id = 3) AS "missed",
					count(DISTINCT workout) filter (where workout.workout_status_id = 4) AS "partially_done",
					string_agg(message.text, ' ') as "text"
				FROM "user"."user" u
				LEFT JOIN plan.plan athlete_plan ON (athlete_plan.athlete_id = u.user_id)
				LEFT JOIN plan.plan_week pw on (pw.plan_id = athlete_plan.plan_id)
				LEFT JOIN plan.workout workout on (pw.plan_week_id = workout.plan_week_id)
				LEFT JOIN plan.message message on (workout.worktout_id = message.workout_id)

				WHERE u.user_id=${userId} and workout.date >= '${monday}' and  workout.date <= '${now}'
				GROUP BY u.user_id
			) res
		`);

		let risk = MIN_RISK;
		let hasPain = false;
		let planId = null;

		if (res && res.length) {
			risk = res[0].risk || MIN_RISK;
			hasPain = res[0].has_pain;
			planId = res[0].plan_id;
		}

		await this.update(userId, {
			preRisk: risk,
		});

		if (planId) {
			await this.query(`UPDATE "plan"."plan" SET has_pain=${hasPain} WHERE plan_id=${planId}`);
		}

		return risk;
	}

	public async getActiveAthletesByIds(userIds: string, coachId: number): Promise<User[]> {
		return await this.createQueryBuilder('user')
			.leftJoinAndSelect('user.planOfAthlete', 'plan')
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere('user.isActive=TRUE')
			.andWhere('user.isPaid=TRUE')
			.andWhere(`user.userId IN (${userIds})`)
			.andWhere(`plan.coachId=${coachId}`)
			.getMany();
	}

	public async getAthletesByPlanIds(planIds: string, coachId: number) {
		return await this.createQueryBuilder('user')
			.leftJoinAndSelect('user.planOfAthlete', 'plan')
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere('user.isActive=TRUE')
			.andWhere('user.isPaid=TRUE')
			.andWhere(`plan.coachId=${coachId}`)
			.andWhere(`plan.planId IN (${planIds})`)
			.getMany();
	}

	public async getAthleteByphone(phone: string, phoneFormatted: string) {
		return await this.createQueryBuilder('user')
			.leftJoinAndSelect('user.planOfAthlete', 'plan')
			.leftJoinAndSelect('user.coachInfo', 'coach_info')
			.where(`user.userTypeId=${UserType.ATHLETE}`)
			.andWhere('plan.isActive=TRUE')
			.andWhere('user.isActive=TRUE')
			.andWhere('user.isPaid=TRUE')
			.andWhere(`user.phone='${phone}'`)
			.orWhere(`user.phone='${phoneFormatted}'`)
			.getOne();
	}
}
