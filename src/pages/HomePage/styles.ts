import styled from '@mui/system/styled'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'

export const HomePageTitle = styled(Grid)(({ theme }) => {
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  return {
    fontSize: theme.spacing(3.5),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(isXs ? 0 : 1.5),
    justifyContent: isXs ? 'center' : undefined,
  }
})

export const MessagesListsContainerGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(6),
}))
export const ButtonTextBold = styled('span')(() => ({
  fontWeight: 'bold',
}))
