import React from 'react'
import { useSelector } from 'react-redux'
import { Upload, Spin, notification } from 'antd'
import { Button } from 'components/CustomButton'
import css from './index.less'

const UploadAvatar = ({ src, onChangeImage = () => { }, text = '' }) => {
  const onChange = image => {
    if (image.file.status !== 'uploading') {
      if (image.file?.type.match(/^image\/.+$/)) {
        onChangeImage(image)
      } else {
        notification.error({ message: 'Only image files are accepted' })
      }
    }
  }
  const { session: { user } } = useSelector(state => ({
    session: state.session,
  }))
  const accept = 'image/png, image/jpeg, image/jpg'
  return (
    <div className={css.wrapperUploadAvatar}>
      <Spin spinning={!!user?.loading}>
        <img alt='Right logo' src={src} className={css.userAvatar} />
      </Spin>
      <Upload showUploadList={false} onChange={onChange} beforeUpload={() => false} accept={accept}>
        <Button size={Button.SIZE_MEDIUM} face={Button.FACE_SECONDARY} className={css.button} htmlType='button'>{text.toUpperCase()}</Button>
      </Upload>
    </div>
  )
}

export default UploadAvatar
