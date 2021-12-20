import React from 'react'
import { Drawer } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { chatSelector } from 'modules/chat/chat-selectors'
import { toggleChat, clearChat } from 'modules/chat/chat-actions'

import {
  ChatContainer,
  ChatHeader,
  CloseButton,
  CloseTitle,
  IconClose,
  Title,
  ChatBody,
  SubTitle,
  InputContainer,
  Input,
  SendButton,
  SendTitle,
  IconSend,
} from './chat-styled'
import { ChatBox } from './ChatBox'
import { useChat, useChatMessages } from '../hooks'

const Chat = () => {
  const dispatch = useDispatch()
  const { currentAthlete, isOpen } = useSelector(chatSelector)

  const { weeklyMessages, isLoadingMessages } = useChatMessages()

  const { message, onInputChange, onMessageSend, setMessage } = useChat()

  const closeChat = () => {
    dispatch(toggleChat(false))
    dispatch(clearChat())
  }

  return (
    <Drawer
      elevation={1}
      BackdropProps={{ style: { opacity: 0 } }}
      anchor='right'
      open={isOpen}
      variant='persistent'
      onClose={closeChat}
    >
      <ChatContainer>
        <ChatHeader>
          <Title>{currentAthlete.name}</Title>
          <CloseButton onClick={closeChat}>
            <IconClose />
            <CloseTitle>Close</CloseTitle>
          </CloseButton>
        </ChatHeader>
        <ChatBody>
          <SubTitle>All Messages</SubTitle>
          <ChatBox
            weeklyMessages={weeklyMessages}
            isLoadingMessages={isLoadingMessages}
          />
          <InputContainer>
            <Input
              placeholder='Send a message'
              onChange={onInputChange}
              value={message}
              onKeyDown={async event => {
                if (event.keyCode === 13 && event.ctrlKey) {
                  setMessage(prevValue => prevValue + '\n')
                }
                if (event.keyCode === 13) {
                  event.preventDefault()
                  onMessageSend()
                }
              }}
            />
            <SendButton disabled={message === ''} onClick={onMessageSend}>
              <IconSend />
              <SendTitle>SEND</SendTitle>
            </SendButton>
          </InputContainer>
        </ChatBody>
      </ChatContainer>
    </Drawer>
  )
}

export default Chat
