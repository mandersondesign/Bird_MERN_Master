import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import UserType from './user_type';
import CoachInfo from './coach_info';
import UserInfo from './user_info';
import Plan from '../plan/plan';
import Invite from './invite';
import LastActivity from './last_activity';
import UserToStripe from '../subscription/user_to_stripe';
import StripeCard from '../subscription/stripe_card';
import CoachPlanToUser from '../subscription/coach_plan_to_user';
import AthletePlanToUser from '../subscription/athlete_plan_to_user';
import StravaAuth from '../strava/auth';
import Message from '../plan/message';

@Entity({ schema: 'user' })
export default class User {

	public static readonly SOURCE_BIRD: number = 1;
	public static readonly SOURCE_FLEET_FEET: number = 2;

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'user_id',
	})
	public userId: number;

	@Column('character varying', {
		nullable: false,
		name: 'name', // TODO: rename
	})
	public firstName: string;

	@Column('character varying', {
		nullable: true,
		name: 'last_name',
	})
	public lastName: string;

	@Column({
		unique: true,
	})
	@IsEmail()
	public email: string;

	@Column()
	public password: string;

	@Column('character varying', {
		nullable: true,
		name: 'phone',
	})
	public phone: string;

	@Column('character varying', {
		nullable: true,
		name: 'school',
	})
	public school: string;

	@Column('character varying', {
		nullable: true,
		name: 'address',
	})
	public address: string;

	@Column('character varying', {
		nullable: true,
		name: 'city',
	})
	public city: string;

	@Column('character varying', {
		nullable: true,
		name: 'state',
	})
	public state: string;

	@Column('character varying', {
		nullable: true,
		name: 'zip_code',
	})
	public zipCode: string;

	@Column('character varying', {
		nullable: true,
		name: 'country',
	})
	public country: string;

	@ManyToOne(() => UserType, (type) => type.userTypeId, { nullable: false })
	@JoinColumn({ name: 'user_type_id' })
	public userType: UserType;

	@Column('integer', {
		nullable: false,
		name: 'user_type_id'
	})
	public userTypeId: number;

	@Column({
		default: true,
		name: 'is_active',
	})
	public isActive: boolean;

	@Column({
		default: false,
		name: 'is_email_confirmed',
	})
	public isEmailConfirmed: boolean;

	@Column({
		default: false,
		name: 'is_onboarding_completed',
	})
	public isOnboardingCompleted: boolean;

	@Column({
		default: true,
		name: 'is_policy_accepted',
	})
	public isPolicyAccepted: boolean;

	@Column('integer', {
		nullable: true,
		name: 'pre_risk'
	})
	public preRisk: number; // 1 - red, 2 - orange, 3 - green

	@Column({
		default: false,
		name: 'is_paid',
	})
	public isPaid: boolean;

	@Column('character varying', {
		nullable: true,
		name: 'avatar'
	})
	public avatar: string;

	@Column({
		name: 'created_at',
		default: () => 'now()'
	})
	public createdAt: Date;

	// 1 - internal user, 2 - fleet feet
	@Column('integer', {
		default: 1,
		nullable: false,
		name: 'source_id'
	})
	public sourceId: number;

	@Column('character varying', {
		nullable: true,
		name: 'timezone'
	})
	public timezone: string;

	@Column('integer', {
		nullable: true,
		name: 'notification_hour'
	})
	public notificationHour: string;

	@Column('integer', {
		nullable: true,
		name: 'notification_utc_hour'
	})
	public notificationUTCHour: string;

	@Column({
		default: true,
		name: 'is_sms_enabled',
	})
	public isSmsEnabled: boolean;

	@OneToOne(() => CoachInfo, (info: CoachInfo) => info.user)
	public coachInfo: CoachInfo;

	@OneToMany(() => UserInfo, (info: UserInfo) => info.user)
	public userInfo: UserInfo[];

	@OneToMany(() => Plan, (plan: Plan) => plan.athlete)
	public planOfAthlete: Plan[];

	@OneToMany(() => Invite, (invite: Invite) => invite.to)
	public athleteInvite: Invite[];

	@OneToMany(() => Invite, (invite: Invite) => invite.from)
	public coachInvite: Invite[];

	@OneToMany(() => LastActivity, (lastActivity: LastActivity) => lastActivity.user)
	public lastActivity: LastActivity[];

	@OneToOne(() => UserToStripe, (stripe) => stripe.user)
	public stripe: UserToStripe;

	@OneToMany(() => StripeCard, (card: StripeCard) => card.user)
	public card: StripeCard[];

	@OneToOne(() => CoachPlanToUser, (plan) => plan.coach)
	public coachPlanToUser: CoachPlanToUser;

	@OneToOne(() => AthletePlanToUser, (plan) => plan.athlete)
	public athletePlanToUser: AthletePlanToUser;

	@OneToOne(() => StravaAuth, (stravaAuth) => stravaAuth.user)
	public stravaAuth: StravaAuth;

	@OneToMany(() => Message, (message: Message) => message.athlete)
	public messages: Message[];
}
