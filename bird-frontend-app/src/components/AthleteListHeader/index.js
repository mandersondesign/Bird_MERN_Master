import React from 'react'
import { Grid } from '@material-ui/core'

import { Title } from './styled'
import { useStyles } from './styles'

const AthleteListHeader = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.headerContainer}>
      <Grid item xs={4}>
        <Title>ATHLETE</Title>
      </Grid>
      <Grid item xs={3}>
        <Title>LAST ACTIVITY</Title>
      </Grid>
      <Grid item xs={5}>
        <Title>LAST MESSAGE</Title>
      </Grid>
    </Grid>
  )
}

export default AthleteListHeader
