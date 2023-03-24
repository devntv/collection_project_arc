import React from 'react';
import { Grid, Container } from '@material-ui/core';

import Copyright from 'components/mocules/Copyright';
import FooterLeftItem from './components/FooterLeftItem';
import FooterRightItem from './components/FooterRightItem';
import styles from './styles.module.css';

const FooterComp = () => (
  <footer>
    <div className={styles.global_style}>
      <Container maxWidth="lg">
        <Grid display="flex" justifyContent="space-between" container>
          <FooterLeftItem />
          <FooterRightItem />
        </Grid>
      </Container>
    </div>
    <Copyright />
  </footer>
);

export default React.memo(FooterComp);
