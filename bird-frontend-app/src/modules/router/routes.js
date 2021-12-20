import Login from 'modules/session/session-form-container'
import ResetPasswordRequest from 'modules/auth/reset-password/reset-password-form-container'
import UpdatePassword from 'modules/auth/update-password/update-password-form-container'
import EmailConfirmation from 'modules/auth/email-confirmation/email-confirmation-form-container'
import InviteConfirmation from 'modules/auth/invite-confirmation/invite-confirmation-form-container'
import Invite from 'modules/auth/invite/invite'
import CompleteOnBoarding from 'modules/onboarding/completedOnBoarding/completedOnBoarding-form-container'

import Users from 'modules/users/users-form-container'
import Athlets from 'modules/athlets/athlets-form-container'
import PlanTemplates from 'modules/plans/plans-form-container'
import EditUser from 'modules/users/edit-user-form-container'
import Athlete from 'modules/athlets/athlete-form-container'
import Library from 'modules/library/library-form-container'
import LibraryPlan from 'modules/library/library-plan-container'
import Onboarding from 'modules/onboarding/onboarding-form-container'
import PaymentForm from 'modules/payment/payment-form-container'
import Coach from 'modules/coach/coach-form-container'
import Workouts from 'modules/workouts/workouts-form-container'

import { TestPage } from 'components/Test'

import { Registration, ReleaseForm, Payment, Confirmation } from 'pagesFeet'
import { Main, Confirmation as ConfirmationMarketing } from '../../components/dashboard/PagesMarketing'
import { StravaConnection } from 'components/dashboard/Pages'

export const authorized = [
  {
    path: '/completeonboarding',
    component: CompleteOnBoarding,
  },
  {
    path: '/coach/:id',
    component: Coach,
  },
  {
    path: '/steps/:step',
    component: Onboarding,
  },
  {
    path: '/steps/:step/plan/:planId',
    component: Onboarding,
  },
  {
    path: '/user/:userID/edit',
    component: EditUser,
  },
  {
    path: '/user/create',
    component: EditUser,
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/athletes',
    component: Athlets,
    exact: true,
  },
  {
    path: '/athletes/unassigned', //  remove this after fix
    component: Athlets,
  },
  {
    path: '/athletes/:athleteId/profile',
    component: Athlete,
  },
  {
    path: '/athletes/:athleteId/plan',
    component: Athlete,
  },
  {
    path: '/plan_template/:planTemplateId/athletes',
    component: PlanTemplates,
  },
  {
    path: '/my_library/workouts',
    component: Athlets,
  },
  {
    path: '/my_library/plan_templates',
    component: Library,
  },
  {
    path: '/my_library/:planTemplateId/plan_template',
    component: LibraryPlan,
  },
  {
    path: '/my_library/workout_library',
    component: Workouts,
  },
  {
    path: '/my_library/workout_library/:id',
    component: Workouts,
  },
  {
    path: '/loginCoach',
    component: Login,
  },
  {
    path: '/success',
    component: StravaConnection,
    exact: true,
  },
  {
    path: '/error',
    component: StravaConnection,
    exact: true,
  },
  {
    path: '/unsucessful',
    component: StravaConnection,
    exact: true,
  },
]

export const unauthorized = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/test',
    component: TestPage,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/email-confirm',
    component: EmailConfirmation,
  },
  {
    path: '/invite-confirm',
    component: InviteConfirmation,
  },
  {
    path: '/reset-password',
    component: ResetPasswordRequest,
  },
  {
    path: '/update-password',
    component: UpdatePassword,
  },
  {
    path: '/invite',
    component: Invite,
  },
  {
    path: '/signUp',
    component: Login,
    exact: true,
  },
  {
    path: '/signUpVerification',
    component: Login,
    exact: true,
  },
  {
    path: '/payment',
    component: PaymentForm,
    exact: true,
  },
  {
    path: '/success',
    component: StravaConnection,
    exact: true,
  },
  {
    path: '/error',
    component: StravaConnection,
    exact: true,
  },
  {
    path: '/unsucessful',
    component: StravaConnection,
    exact: true,
  },
]

export const fleetFeet = [
  {
    path: '/event/:id/sign-up',
    component: Registration,
    exact: true,
  },
  {
    path: '/event/:id/sign-in',
    component: Registration,
    exact: true,
  },
  {
    path: '/event/:id/release-form',
    component: ReleaseForm,
    exact: true,
  },
  {
    path: '/event/:id/payment',
    component: Payment,
    exact: true,
  },
  {
    path: '/event/:id/confirmation',
    component: Confirmation,
    exact: true,
  },
]

export const marketing = [
  {
    path: '/sign-in/:alias',
    component: Main,
    exact: true,
  },
  {
    path: '/sign-up/:alias',
    component: Main,
    exact: true,
  },
  {
    path: '/:alias/confirmation',
    component: ConfirmationMarketing,
    exact: true,
  },
  {
    path: '/:alias',
    component: Main,
    exact: true,
  },
]

export const marketingAuthorized = [
  {
    path: '/sign-in/:alias',
    component: Main,
    exact: true,
  },
  {
    path: '/sign-up/:alias',
    component: Main,
    exact: true,
  },
  {
    path: '/:alias/confirmation',
    component: ConfirmationMarketing,
    exact: true,
  },
  {
    path: '/:alias',
    component: Main,
    exact: true,
  },
  {
    path: '/:alias/confirmation',
    component: ConfirmationMarketing,
    exact: true,
  },
]

export const unauthorizedPathNames = unauthorized.map(route => route.path)
export const authorizedPathNames = authorized.map(route => route.path)
