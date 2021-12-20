import { SESSION_STATE } from 'modules/session/session-constants'

export const sessionSelector = state => state[SESSION_STATE]
