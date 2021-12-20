import { PAYMENT_STATE } from './payment-constants'

export const paymentSelector = state => state[PAYMENT_STATE]
