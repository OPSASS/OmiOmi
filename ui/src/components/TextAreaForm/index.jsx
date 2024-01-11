import { resetFileData, uploadFile } from '@/redux/slice/filesSlice'
import { DeleteOutlined, PictureOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons'
import { Button, Col, Form, Image, Input, Popover, Row, Space, Upload, notification } from 'antd'
import EmojiPicker from 'emoji-picker-react'
import { useCallback, useEffect, useState } from 'react'
import { RiAttachment2 } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import './styles.scss'

const TextAreaForm = ({
  name,
  typeUpload,
  maxRows,
  minRows,
  form,
  uploadImg = false,
  uploadFiles = false,
  maxCountImg,
  showButtonSend = true,
  sendButtonIcon = <SendOutlined />,
  sendText,
  callbackTypes,
  callbackPreviews,
  previews,
  showPreview = true,
  placeholder = 'Viết gì đó',
  maxLength,
}) => {
  const dispatch = useDispatch()
  const { file, successDetail: success } = useSelector((state) => state.files)
  const [text, setText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const POST = import.meta.env.VITE_IMAGES_FOLDER

  const handleEmojiClick = useCallback((emoji) => {
    setText((prevInput) => prevInput + emoji.emoji)
  }, [])

  useEffect(() => {
    if (text) form.setFieldsValue({ [name]: text })
  }, [text])

  const [fileList, setFileList] = useState([])
  const [filePreview, setFilePreview] = useState([])
  const beforeUpload = (_, files) => {
    if (files) {
      if (maxCountImg && files.length > maxCountImg) {
        return notification.error({ message: 'Thông báo', description: `Bạn chỉ được đang tối đa ${maxCountImg} ảnh!` })
      } else {
        setFileList(files)
      }
    }
  }

  useEffect(() => {
    if (fileList.length > 0 && fileList[0]?.type) {
      dispatch(uploadFile({ type: typeUpload, data: fileList }))
    }
  }, [fileList])

  useEffect(() => {
    if (file && success) {
      const prvArr = file.map((i) => {
        return { uid: i, url: i }
      })
      setFilePreview(prvArr)
      callbackPreviews(prvArr)
      dispatch(resetFileData())
    }
  }, [file, success])

  useEffect(() => {
    setFilePreview(previews)
  }, [previews])

  const handleSend = useCallback(() => {
    form.submit()
    setText('')
    setFileList([])
    setFilePreview([])
  }, [form, setText, setFileList, setFilePreview])

  const onEnterPress = useCallback(
    (e) => {
      if (e.keyCode === 13 && !e.shiftKey) {
        handleSend()
      }
    },
    [handleSend],
  )
  return (
    <div className='textArea-form'>
      <Space direction='vertical' className='d-flex'>
        {showPreview && (
          <Row gutter={[5, 5]} justify='space-between' className='uploadPreview' style={{ margin: 0 }}>
            {filePreview &&
              filePreview.slice(0, 5).map((item) => (
                <Col
                  span={
                    24 / filePreview.length >= 8
                      ? filePreview.length === 1
                        ? 8
                        : (24 / filePreview.length).toFixed(0)
                      : 8
                  }
                  key={item.uid}
                  className='imgPreview'
                >
                  <Button
                    icon={<DeleteOutlined />}
                    type='primary'
                    danger
                    shape='circle'
                    size='small'
                    onClick={() => setFilePreview((prev) => prev.filter((file) => item.uid !== file.uid))}
                    className='imgButtRm'
                  />
                  <Image.PreviewGroup
                    key={item.img}
                    items={filePreview.map((image) => {
                      return POST + image.url
                    })}
                  >
                    <Image src={POST + item.url} style={{ maxHeight: 150, objectFit: 'cover' }} width={'100%'} />
                  </Image.PreviewGroup>
                </Col>
              ))}
            {filePreview && filePreview.length > 5 && (
              <Col span={8}>
                <Image.PreviewGroup
                  items={filePreview.map((image) => {
                    return POST + image.url
                  })}
                >
                  <div className='uploadImgPrev'>
                    <Image
                      src={POST + filePreview[5].url}
                      style={{ maxHeight: 250, objectFit: 'cover' }}
                      width={'100%'}
                    />
                    {filePreview.length > 6 && (
                      <div className='showImg'>
                        <h3>+ {filePreview.length - 6}</h3>
                        <div className='bgImg' />
                      </div>
                    )}
                  </div>
                </Image.PreviewGroup>
              </Col>
            )}
          </Row>
        )}
        <Form.Item name={name} style={{ margin: 0 }}>
          <Input.TextArea
            autoSize={{ maxRows, minRows }}
            placeholder={placeholder}
            className='textarea-box'
            style={{ paddingRight: showButtonSend ? 135 : undefined, paddingBottom: showButtonSend ? undefined : 40 }}
            size='large'
            onClick={() => setShowEmojiPicker(false)}
            onChange={(e) => {
              setText(e.target.value)
              setShowEmojiPicker(false)
            }}
            onKeyDown={onEnterPress}
            autoFocus
            maxLength={maxLength}
            showCount={Boolean(maxLength)}
          />
        </Form.Item>
      </Space>
      <Space className='send-butt' size='small' align='baseline'>
        {uploadImg && (
          <Upload
            showUploadList={false}
            onClick={() => setShowEmojiPicker(false)}
            onChange={() => callbackTypes && callbackTypes('images')}
            beforeUpload={beforeUpload}
            maxCount={maxCountImg}
            multiple
          >
            <Button icon={<PictureOutlined />} type='link' />
          </Upload>
        )}
        {uploadFiles && (
          <Upload
            showUploadList={false}
            onClick={() => setShowEmojiPicker(false)}
            onChange={() => callbackTypes && callbackTypes('files')}
            beforeUpload={beforeUpload}
            maxCount={1}
          >
            <Button icon={<RiAttachment2 size={16} style={{ marginBottom: -3 }} />} type='link' />
          </Upload>
        )}

        <Popover
          open={showEmojiPicker}
          placement='topLeft'
          arrow
          content={
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={280}
              height={380}
              previewConfig={{ showPreview: false }}
              searchDisabled
              disableAutoFocus
              emojiStyle='native'
            />
          }
        >
          <Button icon={<SmileOutlined />} type='link' onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
        </Popover>
        {showButtonSend && (
          <Button icon={sendButtonIcon && sendButtonIcon} type={sendText ? 'primary' : 'link'} onClick={handleSend}>
            {sendText}
          </Button>
        )}
      </Space>
    </div>
  )
}

export default TextAreaForm
