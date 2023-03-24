import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
// import Slider from '@material-ui/core/Slider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
// import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CustomerClient, getData } from 'clients';
import Template from 'components/layout/Template';
import { InfoContainer } from 'components/organisms';
import { DIAMOND_ICON, GOLD_ICON, PLATINUM_ICON, SILVER_ICON } from 'constants/Images';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide, UserService } from 'services';
import { formatFloatNumber } from 'utils/FormatNumber';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

const title = getTitle('Thông tin cấp bậc');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const [levelRes, accRes] = await Promise.all([CustomerClient.getLevelList({ ctx }), UserService.getAccount(ctx)]);
      const customerInfo = getData(accRes);
      const levelInfo = getData(levelRes)
        .filter((item) => item?.status === 'ON' && item?.code !== 'LEVEL_BLACKLIST' && item?.code !== 'LEVEL_GUEST')
        .sort((a, b) => a.point - b.point);
      return {
        props: {
          levelInfo,
          customerInfo,
          SEO_CONFIG: {
            title,
          },
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}
// const StyledSlider = withStyles({
//   root: {
//     color: '#d4d4d4',
//     height: 8,
//     width: '100%',
//   },
//   thumb: {
//     height: 24,
//     width: 24,
//     backgroundColor: 'transparent',
//     marginTop: 0,
//     color: '#3bb46d',
//     marginLeft: -12,
//     '&:focus, &:hover, &$active': {
//       boxShadow: 'inherit',
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: 'calc(-50% + 4px)',
//     backgroundColor: '#3bb46d',
//     borderRadius: '4px',
//     top: -20,
//     '&:after': {
//       content: '""',
//       position: 'absolute',
//       border: 'solid 5px transparent',
//       borderTop: 'solid 0px transparent',
//       borderWidth: 5,
//       left: '50%',
//       marginLeft: -5,
//       borderColor: '#3bb46d transparent transparent transparent',
//     },
//     '& span': {
//       transform: 'none',
//       display: 'block',
//       whiteSpace: 'nowrap',
//       width: 'auto',
//       height: 'auto',
//     },
//     '&>span': {
//       borderRadius: '50%',
//       padding: '3px 5px',
//     },
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//     color: '#00b46e',
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);

const StyledPaper = withStyles({
  root: {
    height: '100%',
  },
  outlined: {
    border: '1px solid #E0E5F3',
  },
  elevation1: {
    boxShadow: 'none',
  },
})(Paper);

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      color: '#2A2F5E',
      fontSize: 18,
      marginBottom: 20,
    },
  },
  headline: {
    fontWeight: 700,
    fontSize: 25,
    [theme.breakpoints.down('sm')]: {
      color: '#2A2F5E',
      fontSize: '18px',
      textAlign: 'center',
    },
  },
  card: {
    height: '100%',
    boxShadow: 'none',
  },
  cardHeader: {
    justifyContent: 'center',
    borderBottom: '1px solid #eaeaea',
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      fontWeight: 700,
    },
  },
  cardHeaderContent: {
    flex: 'unset',
  },
  avatar: {
    marginRight: 5,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  cardHeaderTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      fontWeight: 700,
    },
  },
  point: {
    color: '#101754',
    marginTop: 5,
    marginBottom: 15,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  customPaper: {
    display: 'inline-block',
  },
  customGrid: {
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
      overflow: 'auto',
    },
  },
  active: {
    border: '1px solid green',
    boxShadow: '2px 2px 6px 2px #c5c5c5',
  },
  customGridInner: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '320px',
    },
  },
}));

const LevelIcon = ({ level }) => {
  if (level === 'LEVEL_SLIVER') return <img alt="silver" src={SILVER_ICON} />;
  if (level === 'LEVEL_GOLD') return <img alt="gold" src={GOLD_ICON} />;
  if (level === 'LEVEL_PLATINUM') return <img alt="platinum" src={PLATINUM_ICON} />;
  if (level === 'LEVEL_DIAMOND') return <img alt="diamond" src={DIAMOND_ICON} />;
  return null;
};
// const getLevelPercent = ({ curPoint, minLevelPoint, maxLevelPoint }) => {
//   if (!maxLevelPoint) return 100;
//   return Math.min((curPoint - minLevelPoint) / (maxLevelPoint - minLevelPoint), 1) * 100;
// };
const Level = ({ user, isMobile, levelInfo = [], customerInfo = null }) => {
  const classes = useStyles();
  const curLevelID = customerInfo?.[0]?.level;
  const curLevelInfo = levelInfo.filter((item) => item.code === curLevelID);
  let val = null;
  const nextLevelInfo = levelInfo.slice(0).reduce((acc, item, index) => {
    if (item.code === customerInfo?.[0]?.level && levelInfo[index + 1]) {
      val = levelInfo[index + 1];
    }
    return val;
  }, {});
  // const nextLevelPercent = getLevelPercent({
  //   curPoint: customerInfo?.[0]?.levelPoint,
  //   minLevelPoint: curLevelInfo?.[0]?.point,
  //   maxLevelPoint: nextLevelInfo?.point,
  // });
  return (
    <Template pageTitle={title} isMobile={isMobile}>
      <Box overflow="hidden" pt={4} pb={{ xs: 10, sm: 0 }}>
        <Container maxWidth="lg" style={{ background: '#f5f5f5' }}>
          <InfoContainer value={2} title="Thông tin cấp bậc" subTitle="Thông tin cấp bậc" point={user?.point} name={user?.name} isMobile={isMobile}>
            <Box bgcolor="white" p={2} width="100%">
              <Box mb={3} pl={[0, '20%', '34%']}>
                {curLevelID !== 'LEVEL_GUEST' && curLevelID !== 'LEVEL_BLACKLIST' && (
                  <Box display="flex" alignItems="center" pt={{ xs: 0, sm: 3 }}>
                    <Box fontSize={{ xs: 12, sm: 16 }} fontWeight={500} p={1} color="text.secondary" flex={{ xs: '0 0 150px', sm: '0 0 200px' }}>
                      Cấp bậc hiện tại
                    </Box>
                    <Box flexGrow={1} display="flex" alignItems="center" p={1}>
                      <Box display="flex" alignItems="center" pr={1}>
                        <LevelIcon level={curLevelID} />
                      </Box>
                      <Typography variant="body1" component="div" color="textPrimary">
                        <Box fontSize={{ xs: 14, sm: 18 }} fontWeight={500} display="inline" alignItems="center" pr={1}>
                          {curLevelID === 'LEVEL_BLACKLIST' ? 'Danh sách đen' : curLevelInfo?.[0]?.name}
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                )}
                <Box display="flex" alignItems="center" pt={{ xs: 0, sm: 3 }}>
                  <Box fontSize={{ xs: 12, sm: 16 }} fontWeight={500} flex={{ xs: '0 0 150px', sm: '0 0 200px' }} p={1} color="text.secondary">
                    Tích luỹ hiện tại
                  </Box>
                  <Box flexGrow={1} p={1}>
                    <Box display="inline" fontSize={{ xs: 14, sm: 18 }} fontWeight={500}>
                      {formatFloatNumber(customerInfo?.[0]?.levelPoint || 0)} điểm
                    </Box>
                    {/* <Box pl={1} display="inline" fontSize="12px" color="secondary.main">
                  (50 điểm sẽ hết hạn vào ngày 20/08/2021)
                </Box> */}
                  </Box>
                </Box>
                {curLevelID !== 'LEVEL_GUEST' && curLevelID !== 'LEVEL_BLACKLIST' && nextLevelInfo && (
                  <Box display="flex" alignItems="center" pt={{ xs: 0, sm: 3 }}>
                    <Box flex={{ xs: '0 0 150px', sm: '0 0 200px' }} fontSize={{ xs: 12, sm: 16 }} fontWeight={500} p={1} color="text.secondary">
                      Lên hạng tiếp theo cần
                    </Box>
                    <Box flexGrow={1} p={1}>
                      <Box display="inline" fontSize={{ xs: 14, sm: 18 }} fontWeight={500}>
                        {formatFloatNumber(Math.max((nextLevelInfo?.point || 0) - (customerInfo?.[0]?.levelPoint || 0), 0))} điểm
                      </Box>
                    </Box>
                  </Box>
                )}
                {/* {curLevelID !== 'LEVEL_GUEST' && curLevelID !== 'LEVEL_BLACKLIST' && (
              <Box display="flex" alignItems="center" pt={{ xs: 0, sm: 3 }}>
                <Box fontSize={{ xs: 12, sm: 16 }} fontWeight={500} flex="0 0 150px" p={1} color="text.secondary">
                  Thăng hạn kế tiếp
                </Box>
                <Box flexGrow={1} p={1}>
                  <Box display="flex" width={['100%', 300, 400]} flexGrow={1} color="text.secondary">
                    <StyledSlider value={nextLevelPercent} valueLabelFormat={() => `${Math.round(nextLevelPercent)} %`} valueLabelDisplay="on" />
                    <Box flexGrow={1} display="flex" whiteSpace="nowrap" alignItems="center" pl="10px" pt="5px">
                      <Box display="flex" alignItems="center" pr={1}>
                        <LevelIcon level={nextLevelInfo?.code} />
                      </Box>
                      <Hidden smDown>
                        <Typography variant="body1" component="div" color="textPrimary">
                          <Box component="span" display="inline" alignItems="center" pr={1}>
                            {nextLevelInfo?.name}
                          </Box>
                        </Typography>
                      </Hidden>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )} */}
              </Box>
              <Box mb={3}>
                <Typography classes={{ root: classes.headline }} variant="h6" gutterBottom>
                  Danh sách cấp bậc và quyền lợi
                </Typography>
                <Grid classes={{ root: classes.customGrid }} container spacing={2}>
                  {levelInfo?.length > 0 &&
                    levelInfo.map((item) => (
                      <Grid classes={{ root: classes.customGridInner }} key={item?.levelId} item sm={6} md={4} lg={4}>
                        <StyledPaper elevation={0} variant="outlined" classes={{ root: item.code === curLevelID ? classes.active : '' }}>
                          <Card classes={{ root: classes.card }}>
                            <CardHeader
                              title={item?.name}
                              titleTypographyProps={{ align: 'center', variant: 'subtitle1', component: 'h4' }}
                              avatar={<LevelIcon level={item?.code} />}
                              classes={{
                                root: classes.cardHeader,
                                content: classes.cardHeaderContent,
                                avatar: classes.avatar,
                                title: classes.cardHeaderTitle,
                              }}
                            />
                            <CardContent>
                              <Box classes={{ root: classes.point }} fontWeight={500} fontSize={18} textAlign="center">
                                {formatFloatNumber(item?.point || 0)} điểm
                              </Box>
                              <Box textAlign="left" dangerouslySetInnerHTML={{ __html: item?.description }} />
                            </CardContent>
                          </Card>
                        </StyledPaper>
                      </Grid>
                    ))}
                </Grid>
              </Box>
              <Box mb={3}>
                <Typography classes={{ root: classes.headline }} variant="h6" gutterBottom>
                  Cách tính cấp bậc khách hàng
                </Typography>
                <StyledPaper classes={{ root: classes.customPaper }} elevation={0} variant="outlined">
                  <Card classes={{ root: classes.card }}>
                    <CardContent className={styles.CardContent}>
                      <ul>
                        <li>
                          <Typography variant="body1">Vào 0h mỗi ngày sẽ tính lại cấp bậc của khách hàng</Typography>
                        </li>
                        <li>
                          <Typography variant="body1">Quy đổi điểm theo:</Typography>
                        </li>
                        <ul>
                          <li>
                            <Typography variant="body1">100.000 vnđ sẽ được 1 điểm hoặc theo điểm tích lũy được quy định cho sản phẩm đó</Typography>
                          </li>
                          <li>
                            <Typography variant="body1">Nếu sản phẩm có hệ số nhân sẽ nhân lên tương ứng theo điểm quy đổi</Typography>
                          </li>
                        </ul>
                        <li>
                          <Typography variant="body1">Điểm sẽ được cộng tương ứng với từng sản phẩm:</Typography>
                        </li>
                        <ul>
                          <li>
                            <Typography variant="body1">Đã giao hàng thành công</Typography>
                          </li>
                          <li>
                            <Typography variant="body1">Đơn hàng đã hoàn tất</Typography>
                          </li>
                        </ul>
                        <li>
                          <Typography variant="body1">
                            Hệ thống sẽ dựa trên số đơn đã hoàn tất từ 3 tháng gần nhất đến thời điểm hiện tại để tính
                          </Typography>
                        </li>

                        <li>
                          <Typography variant="body1">
                            Ví dụ: Tính cấp bậc cho khách hàng vào lúc 0h ngày 26/5/2021, hệ thống sẽ tính tất cả đơn hàng hoàn tất từ ngày 01/02/2021
                            đến ngày 25/5/2021
                          </Typography>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </StyledPaper>
              </Box>
            </Box>
          </InfoContainer>
        </Container>
      </Box>
    </Template>
  );
};

export default withLogin(Level);
