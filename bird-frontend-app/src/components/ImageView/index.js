import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
// import {get} from 'utils';

import css from './styles.less'

// const imageEncode = arrayBuffer => {
//   const b64encoded = Buffer.alloc(arrayBuffer, 'binary').toString('base64')
//   const mimetype = 'image/jpeg'
//   return `data:${mimetype};base64,${b64encoded}`
// }

// const getBase64 = id => get(`v1/users/getPhoto/${id}`, {}, { responseType: 'arraybuffer' })
//     .then(({ data }) => imageEncode(data));

const isImage = imageID => imageID !== 'none'

class ImageView extends Component {
    state = {
      imageEncode: null,
    }

    componentWillMount () {
      this.getEncodeImage()
    }

    getEncodeImage = () => {
      // const { imageID } = this.props
      // if (isImage(imageID)) getBase64(imageID).then(imageEncode => this.setState({ imageEncode }))
    }

    componentDidUpdate (prevProps) {
      const { imageID: oldImageID } = prevProps

      if (oldImageID !== this.props.imageID) {
        this.getEncodeImage()
      }
    }

    render () {
      const { className, imageID } = this.props
      const rootClass = cn(css.imageView, className)

      return isImage(imageID) && <img className={rootClass} src={this.state.imageEncode} />
    }
}

ImageView.propTypes = {
  className: PropTypes.string,
  imageID: PropTypes.string,
}

ImageView.defaultProps = {
  className: '',
  imageID: 'none',
}

export default ImageView
