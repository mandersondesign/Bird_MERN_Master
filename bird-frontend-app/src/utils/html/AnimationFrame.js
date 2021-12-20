class AnimationFrame {
  frame = null;

  constructor (handler) {
    Object.assign(this, { handler })
  }

  request () {
    if (this.frame == null) {
      this.frame = requestAnimationFrame(() => {
        this.frame = null
        this.handler()
      })
    }

    return this
  }

  cancel () {
    const { frame } = this

    if (frame) {
      this.frame = null
      cancelAnimationFrame(frame)
    }

    return this
  }
}

export default AnimationFrame
