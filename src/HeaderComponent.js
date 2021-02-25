import React from 'react';
import {Grid, Typography, Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function HeaderComponent(props) {

    return (
        <Grid container 
              justify="space-between"
              alignItems="center"
              style={{marginTop: '2em'}}>
            <Grid item>
                <Typography variant="h4">
                    TODO
                </Typography>
            </Grid>
            <Grid item>
                <Fab size='medium'
                     color='primary'
                     onClick={props.handleDialogOpen}>
                    <AddIcon/>
                </Fab>
            </Grid>
        </Grid>
    )
}

export default HeaderComponent;