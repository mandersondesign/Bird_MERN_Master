let passiveSupported = true

const passiveOptions = {
  /* eslint-disable getter-return */
  get passive () {
    passiveSupported = true
  },
}

try {
  // noinspection JSUnresolvedFunction
  window.addEventListener('test', null, passiveOptions)
  // noinspection JSUnresolvedFunction
  window.removeEventListener('test', null, passiveOptions)
} catch (err) {
  passiveSupported = false
}

/**
 * @typedef { Object } ListenerOptions
 * @property { boolean } capture
 * @property { boolean } passive
 */

/**
 * @param { boolean | ListenerOptions } opts
 *
 * @return { boolean | ListenerOptions }
 */
function toListenerOptions (opts) {
  let nextOpts = opts

  if (typeof opts === 'object') {
    nextOpts = passiveSupported ? opts : opts.capture || false
  }

  return nextOpts
}

/**
 * @param { EventTarget } element
 * @param { string } event
 * @param { function } listener
 * @param { boolean | ListenerOptions } opts
 *
 * @return { function(): * }
 */
function addListener (element, event, listener, opts) {
  element.addEventListener(event, listener, opts)

  return () => element.removeEventListener(event, listener, opts)
}

/**
 * Adds an event listener to the provided element and return a function to remove added listener later.
 *
 * @param { HTMLElement } element - Element
 * @param { string } event - Event name (or names separated by any whitespace)
 * @param { function } listener - Handler
 * @param { boolean | ListenerOptions } captureOrOptions - Capture flag or options
 *
 * @return { function }
 *
 * @example
 *
 * class FooBar extends React.Component {
 *   removeClickListener = null;
 *
 *   componentDidMount() {
 *     this.removeClickListener = addEventListener(document.body, 'click', this.handleClick);
 *   }
 *
 *   componentWillUnmount() {
 *     if (this.removeClickListener) {
 *       this.removeClickListener();
 *     }
 *   }
 *
 *   handleClick = () => {
 *     // do something
 *   };
 * }
 *
 */
export default function addEventListener (element, event, listener, captureOrOptions = false) {
  const options = toListenerOptions(captureOrOptions)
  const removers = event.split(/\s+/).map(event => addListener(element, event, listener, options))

  return removers.length > 1 ? () => removers.forEach(remover => remover()) : removers[0]
}
