/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, FC, useCallback } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import MessagesList from '../../components/MessagesList'
import { messagesPrioritiesTypes, messagesTypes } from '../../types'
import { GlobalContext } from '../../contexts/GlobalContext'
import { ButtonTextBold, HomePageTitle, MessagesListsContainerGrid } from './styles'
import generateMessage from '../../Api'

const App: FC<{}> = () => {
  const { messages, addNewMessage, removeAllMessages, messagesAreRunning, toggleMessagesRunner } = useContext(GlobalContext)

  const toggleMsgsRun = useCallback(toggleMessagesRunner, [])
  const addMessage = useCallback(addNewMessage, [addNewMessage])
  useEffect(() => {
    const cleanUp = generateMessage(addMessage)
    return cleanUp
  }, [])

  const errorMessages = messages?.filter?.(({ priority }) => priority === messagesPrioritiesTypes.ERROR).sort((a: any, b: any) => a?.timestamp - b?.timestamp)
  const warningMessages = messages
    ?.filter?.(({ priority }) => priority === messagesPrioritiesTypes.WARNING)
    .sort((a: any, b: any) => a?.timestamp - b?.timestamp)
  const infoMessages = messages?.filter?.(({ priority }) => priority === messagesPrioritiesTypes.INFO).sort((a: any, b: any) => a?.timestamp - b?.timestamp)

  return (
    <div>
      <Grid container item>
        <HomePageTitle data-testid='page-title' container item xs={12}>
          nuffsaid.com Coding Challenge
        </HomePageTitle>
      </Grid>
      <hr />
      <Grid container item justifyContent='center'>
        <Grid container item md={4} xs={12} justifyContent='center' spacing={1}>
          <Grid item xs={12} md={2} justifyContent='center'>
            <Button variant='contained' color='success' fullWidth data-testid='start-stop-button' onClick={toggleMsgsRun}>
              <ButtonTextBold>{messagesAreRunning ? 'STOP' : 'START'}</ButtonTextBold>
            </Button>
          </Grid>
          <Grid item xs={12} md={2} justifyContent='center'>
            <Button variant='contained' color='success' onClick={removeAllMessages} fullWidth data-testid='clear-button'>
              <ButtonTextBold>CLEAR</ButtonTextBold>
            </Button>
          </Grid>
        </Grid>

        <MessagesListsContainerGrid container spacing={2} justifyContent='center'>
          <Grid item xs={12} md={3}>
            <MessagesList messages={errorMessages} title='Error Type 1' count={errorMessages?.length} type={messagesTypes.error} />
          </Grid>
          <Grid item xs={12} md={3}>
            <MessagesList messages={warningMessages} title='Warning Type 2' count={warningMessages?.length} type={messagesTypes.warning} />
          </Grid>
          <Grid item xs={12} md={3}>
            <MessagesList messages={infoMessages} title='Info Type 3' count={infoMessages?.length} type={messagesTypes.info} />
          </Grid>
        </MessagesListsContainerGrid>
      </Grid>
    </div>
  )
}

export default App
