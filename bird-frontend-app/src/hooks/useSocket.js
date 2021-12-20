import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import config from 'config'
import { useSelector } from 'react-redux'
import { sessionSelector } from 'modules/session/session-selectors'

export const useSocket = () => {
  const { token } = useSelector(sessionSelector)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const connectSocket = async () => {
      const socket = await io(`${config.socketUrl}`, {
        query: `token=${token}`,
        path: '/socket.io',
        transports: ['websocket'],
        withCredentials: true,
        secure: true,
      })
      setSocket(socket)
    }
    if (!socket) {
      console.log('Connecting Socket')
      connectSocket()
    }
    return () => {
      if (socket) {
        console.log('Disconnecting Socket')
        socket.close()
      }
    }
  }, [setSocket])

  return {
    socket,
  }
}
