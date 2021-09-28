import styled from '@mui/system/styled'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import { useMediaQuery } from '@mui/material'

export const MessageTextContainer = styled(Grid)(({ theme }: any) => ({
  height: theme.spacing(5),
  color: 'black',
}))

export const MessageText = styled(Grid)({})

export const ClearMessageListItemText = styled('span')(() => ({
  color: 'black',
  textTransform: 'capitalize',
}))

export const CountLabelContainer = styled(Grid)(({ theme }: any) => ({
  marginBottom: theme.spacing(1),
}))

export const ClearButtonContainerGrid = styled(Grid)({
  height: '100%',
})

export const MessagesListItemContainer = styled(ListItem)(({ theme, type }: any) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette[type].main,
  paddingTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1.5),
  boxShadow: '0 2px 2px rgba(0,0,0,0.16), 0 2px 2px rgba(0,0,0,0.23)',
}))

export const ListContainer = styled(List)(({ theme }) => {
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  return {
    paddingRight: isXs ? 10 : 0,
    paddingLeft: isXs ? 10 : 0,
    width: '100%',
    maxHeight: isXs ? 600 : 1200,
    overflow: 'hidden',
    overflowY: 'visible',
  }
})
