import { Container, Grid } from '@material-ui/core';
import { ButtonDefault, LinkComp } from 'components/atoms';
import { linkQuestionItemLeft, linkQuestionItemRight, LINK_ALL_QUESTION } from 'constants/data';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const renderLinkItem = (data) =>
  data.map((item) => (
    <LinkComp target="_blank" key={`question-${uuidv4()}`} className={styles.link} href={item.href}>
      {item.title}
    </LinkComp>
  ));

const CommonQuestion = () => (
  <div className={styles.wrapper}>
    <Container fixed>
      <h2 className={styles.title}>Câu hỏi thường gặp</h2>

      <Grid container spacing={3}>
        <Grid container style={{ display: 'flex' }} direction="column" item sm={6}>
          {renderLinkItem(linkQuestionItemLeft)}
        </Grid>
        <Grid container style={{ display: 'flex' }} direction="column" item sm={6}>
          {renderLinkItem(linkQuestionItemRight)}
        </Grid>
      </Grid>

      <div style={{ display: 'flex', marginTop: '16px', justifyContent: 'center' }}>
        <ButtonDefault
          classes={{ label: styles.label, outlined: styles.outlined, root: styles.root }}
          href={LINK_ALL_QUESTION}
          variant="outlined"
          target="_blank"
        >
          Xem tất cả câu hỏi
        </ButtonDefault>
      </div>
    </Container>
  </div>
);

export default React.memo(CommonQuestion);
