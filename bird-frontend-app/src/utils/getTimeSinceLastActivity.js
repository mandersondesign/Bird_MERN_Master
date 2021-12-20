import { addEventListener } from 'utils/html'

const ACTIVITY_EVENTS = 'mousedown mousemove keydown'

let lastActivityTime = Date.now()

function setLastActivityTime () {
  lastActivityTime = Date.now()
}

addEventListener(document, ACTIVITY_EVENTS, setLastActivityTime, true)

const getTimeSinceLastActivity = () => Date.now() - lastActivityTime

export default getTimeSinceLastActivity
