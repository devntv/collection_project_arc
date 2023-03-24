import { Grid, Typography } from '@material-ui/core';
import { imageMediaBottom, imageMediaTop } from 'constants/data';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const renderMediaItem = (data) =>
  data.map((item) => (
    <Grid key={`media-${uuidv4()}`} className={styles.hover_link} item xs={6} sm={4} md={3}>
      <a href={item.href} target="_blank" rel="noreferrer">
        <ImageFallbackStatic className={item.dark && styles.dark} src={item.url} width={item.width} height={item.height} layout="fixed" />
      </a>
    </Grid>
  ));

const Media = () => (
  <div className={styles.media_wrapper}>
    <div style={{ fontWeight: 500 }}>
      <Typography variant="h4" align="center" className={styles.center}>
        Truyền thông nói gì về thuocsi.vn
      </Typography>
    </div>

    <div>
      <Grid container className={styles.container} item alignItems="center">
        {renderMediaItem(imageMediaTop)}
        {renderMediaItem(imageMediaBottom)}
      </Grid>
    </div>
  </div>
);

export default Media;
