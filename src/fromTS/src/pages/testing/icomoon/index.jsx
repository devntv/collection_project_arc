import React from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const TestingIcomoon = () => {
  const classes = useStyles();
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>LIST ICON FOR THUOCSI</h1>
      <div className={classes.root}>
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-support" color="inherit" fontSize="default" />
                <div>icon-support</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-check" color="inherit" fontSize="default" />
                <div>icon-check</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-user" color="inherit" fontSize="default" />
                <div>icon-user</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-home" color="inherit" fontSize="default" />
                <div>icon-home</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-product" color="inherit" fontSize="default" />
                <div>icon-product</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-quality" color="inherit" fontSize="default" />
                <div>icon-quality</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-news-professional" color="inherit" fontSize="default" />
                <div>icon-news-professional</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-ingredients" color="inherit" fontSize="default" />
                <div>icon-ingredients</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-phone" color="inherit" fontSize="default" />
                <div>icon-phone</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-settings" color="inherit" fontSize="default" />
                <div>icon-settings</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-quick-order" color="inherit" fontSize="default" />
                <div>icon-quick-order</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-mail" color="inherit" fontSize="default" />
                <div>icon-mail</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-ship-express" color="inherit" fontSize="default" />
                <div>icon-ship-express</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-trending-up" color="inherit" fontSize="default" />
                <div>icon-trending-up</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-trending-down" color="inherit" fontSize="default" />
                <div>icon-trending-down</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-terms" color="inherit" fontSize="default" />
                <div>icon-terms</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-help" color="inherit" fontSize="default" />
                <div>icon-help</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-local-mall" color="inherit" fontSize="default" />
                <div>icon-local-mall</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-local-see" color="inherit" fontSize="default" />
                <div>icon-local-see</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-loyalty" color="inherit" fontSize="default" />
                <div>icon-loyalty</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-notifications" color="inherit" fontSize="default" />
                <div>icon-notifications</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-perm-phone" color="inherit" fontSize="default" />
                <div>icon-perm-phone</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-redeem" color="inherit" fontSize="default" />
                <div>icon-redeem</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-search" color="inherit" fontSize="default" />
                <div>icon-search</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-share" color="inherit" fontSize="default" />
                <div>icon-share</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-shopping" color="inherit" fontSize="default" />
                <div>icon-shopping</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-tune" color="inherit" fontSize="default" />
                <div>icon-tune</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-menu" color="inherit" fontSize="default" />
                <div>icon-menu</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-alarm" color="inherit" fontSize="default" />
                <div>icon-alarm</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-gift" color="inherit" fontSize="default" />
                <div>icon-gift</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-bin2" color="inherit" fontSize="default" />
                <div>icon-bin2</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-warning" color="inherit" fontSize="default" />
                <div>icon-warning</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-checkmark" color="inherit" fontSize="default" />
                <div>icon-checkmark</div>
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <Icon className="icon-checkmark2" color="inherit" fontSize="default" />
                <div>icon-checkmark2</div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default TestingIcomoon;
