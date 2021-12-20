import AnimationFrame from './AnimationFrame'

class Animation {
  timestamp = undefined;

  static animate (props) {
    return new this(props).start()
  }

  static linear () {
    return progress => progress
  }

  static pow (pow) {
    return progress => progress ** pow
  }

  static circ () {
    return progress => 1 - Math.sin(Math.acos(progress))
  }

  stop = () => {
    this.frame.cancel()
  };

  onAnimationFrame = timestamp => {
    if (this.timestamp == null) {
      this.timestamp = timestamp
    }

    let fraction = (timestamp - this.timestamp) / this.duration

    if (fraction > 1) {
      fraction = 1
    }

    this.handler(this.timing(fraction))

    if (fraction < 1) {
      this.frame.request()
    }
  };

  frame = new AnimationFrame(this.onAnimationFrame);

  constructor (props) {
    Object.assign(this, { duration: 300, timing: Animation.linear(), handler: () => undefined }, props)
  }

  start () {
    this.frame.request()

    return this.stop
  }
}

export default Animation
