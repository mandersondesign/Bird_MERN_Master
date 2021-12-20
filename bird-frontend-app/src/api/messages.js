import { api } from './axios'

const METHOD = 'messages'

const sendMessageGroup = body =>
  api.post(`${METHOD}/send-message-group`, { ...body })

const getUserMessages = ({ userId }) =>
  api.get(`${METHOD}/coach/messages?userId=${userId}`)

const sendDM = body => api.post(`${METHOD}/send-dm`, { ...body })
const readMessage = body => api.post(`${METHOD}/read`, body)

const toggleSms = (athleteId, body) =>
  api.post(`${METHOD}/${athleteId}/sms_notifications`, body)

export default {
  sendMessageGroup,
  getUserMessages,
  sendDM,
  readMessage,
  toggleSms,
}
