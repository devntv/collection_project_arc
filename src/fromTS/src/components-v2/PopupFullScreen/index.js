import { Box, Grid, IconButton, Modal, Paper, Zoom } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { isValid, isValidWithoutData } from 'clients';
import { ForgetPasswordFormV2, NewSignInForm, NewSignUpForm } from 'components/mocules';
import TermAndCondition from 'components/mocules/terms-and-condition';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { BRAND_NAME } from 'constants/Enums';
import { MY_ACCOUNT } from 'constants/Paths';
import { useAuth, useCart } from 'context';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AuthService } from 'services';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { gtag, NotifyUtils } from 'utils';
import Insider from 'utils/Insider';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const PopupFullScreen = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasAlert, setHasAlert] = useState('');
  const { updateCart } = useCart();
  const router = useRouter();
  const [page, setPage] = useState(0);

  const { referCode } = router.query;
  const {
    handleChangeForget,
    handleChangeSignUp,
    handleLogin = {},
    handleChangeSignIn,
    login,
    isShowLogin,
    isShowSignUp,
    toggleLogin,
    toggleSignUp,
  } = useAuth();

  const beta = useMobileV2((state) => state.beta);
  const handleOnClickLogin = (data) => {
    setIsLoading(true);
    handleLogin({
      ...data,
      success: updateCart,
      callback: () => {
        setIsLoading(false);
      },
    });
  };

  const handleSignUp = (data) => {
    setIsLoading(true);

    AuthService.signUp(data)
      .then((result) => {
        if (!isValid(result)) {
          NotifyUtils.error(result.message);
          setHasAlert(`Đã có lỗi xảy ra ${result.message}`);
          return;
        }
        // notification
        NotifyUtils.success(`Bạn đã đăng ký tài khoản ${BRAND_NAME} thành công`);

        // add gtag registed completed
        try {
          gtag.registedCompleted();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }

        // Insider event register completed
        try {
          const newUser = result?.data?.[0];
          Insider.registerSuccess(newUser);
        } catch (e) {
          console.error(e);
        }

        // register success -> login and redirect
        AuthService
          // .loginLocal({
          //   username: data.phone,
          //   password: data.password,
          // })
          .login({ username: data.phone, password: data.password, type: 'CUSTOMER' })
          .then((resultlogin) => {
            if (!isValid(resultlogin)) {
              const errorCode = `login.${resultlogin.errorCode}`;
              NotifyUtils.error(errorCode);
              return;
            }
            if (isShowLogin) {
              toggleLogin();
            }
            if (isShowSignUp) {
              toggleSignUp();
            }

            NotifyUtils.success('Đăng nhập thành công');
            const userInfo = resultlogin.data[0];
            login(userInfo, false);

            // redirect to quick-order - when login success
            router.push(`${MY_ACCOUNT}?tab=3`);
          })
          .catch((error) => {
            NotifyUtils.error('Đã có lỗi xảy ra khi đăng nhập ');
            setHasAlert(`Đã có lỗi xảy ra ${error}`);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        NotifyUtils.error(`Đã có lỗi xảy ra khi đăng ký ${error?.message}`);
        setHasAlert(`Đã có lỗi xảy ra khi đăng ký ${error?.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [step, setStep] = useState(1);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [toggleResend, setToggleResend] = useState(false);
  const formContainer = useRef(null);

  useEffect(() => {
    router.beforePopState(({ as }) => {
      // I only want to allow these two routes!
      if (router.asPath === '/?terms=true') {
        // Have SSR render bad routes as a 404.
        router.replace('/?register=true');
        setPage(1);
      } else if (as !== router.asPath) {
        // Have SSR render bad routes as a 404.
        router.replace('/');
        setPage(0);
      } else if (router.asPath === '/?register=true') {
        // Have SSR render bad routes as a 404.
        router.replace('/');
        setPage(0);
      }

      return false;
    });
    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);
  useEffect(() => {
    setPage(isShowSignUp ? 1 : 0);
  }, [isShowSignUp]);

  const onClickPhoneForm = async (data) => {
    setIsLoading(true);
    const result = await AuthService.passwordRecovery(data);
    if (isValidWithoutData(result)) {
      setStep(2);
      NotifyUtils.success('Yêu cầu thay đổi mật khẩu thành công. Kiểm tra tin nhắn để lấy mã OTP');
      setIsLoading(false);
      setToggleResend(!toggleResend);
    } else {
      NotifyUtils.error(result?.message || 'Đã có lỗi xảy ra');
      setIsLoading(false);
    }
  };

  const onSubmitOptForm = async (data) => {
    setIsLoading(true);
    const result = await AuthService.passwordRecovery(data);
    if (isValidWithoutData(result)) {
      setStep(2);
      NotifyUtils.info(result.message);
      setIsLoading(false);
    } else {
      NotifyUtils.error(result?.message || 'Đã có lỗi xảy ra');
      setIsLoading(false);
    }
  };
  const onSubmitNewPasswordForm = async (data) => {
    setIsLoading(true);
    const result = await AuthService.passwordUpdate(data);
    if (isValidWithoutData(result)) {
      setStep(3);
      setIsLoading(false);
      NotifyUtils.success('Mật khẩu mới đã được cập nhật');
    } else {
      // NotifyUtils.error(result?.message || 'Đã có lỗi xảy ra');
      switch (result.message) {
        case 'Not found any matched password_recovery.':
          NotifyUtils.error('Nhập sai mã OTP. Xin vui lòng kiểm tra lại');
          break;
        default:
          NotifyUtils.error('Đã có lỗi xảy ra');
          break;
      }
      setIsLoading(false);
    }
  };
  const handleScrollTop = () => {
    if (formContainer && formContainer.current) {
      formContainer.current.scrollTop = 0;
    }
  };

  const clearState = () => {
    setStep(1);
    setIsTimeOut(false);
    setIsLoading(false);
  };

  const handleClose = () => {
    if (beta) {
      router.replace('/');
      setPage(page - 2);
      clearState();
    }
    clearState();
  };

  const handleCloseTerms = () => {
    router.replace('/?register=true');
    setPage(page - 2);
    handleScrollTop();
  };

  const timeOut = () => {
    setIsTimeOut(true);
  };
  const componentList = [
    <Box className={page === 0 ? styles.slideRight : ''}>
      <NewSignInForm
        onClickForget={handleChangeForget}
        onClickSignUp={handleChangeSignUp}
        onClickLogin={handleOnClickLogin}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        isShowLogin={isShowLogin}
        isShowSignUp={isShowSignUp}
        toggleSignUp={toggleSignUp}
        toggleLogin={toggleLogin}
        user={user}
      />
    </Box>,
    <Box className={page === 1 ? styles.slideLeft : ''}>
      <NewSignUpForm
        hasAlert={hasAlert}
        onClickSignIn={handleChangeSignIn}
        isLoading={isLoading}
        referCode={referCode}
        onClickSignUp={handleSignUp}
        page={page}
        setPage={setPage}
        handleScrollTop={handleScrollTop}
      />
    </Box>,
    <Box className={page === 2 ? styles.slideLeft : ''}>
      <ForgetPasswordFormV2
        className={beta ? styles.mt : ''}
        onClickPhoneForm={onClickPhoneForm}
        onClickOptForm={onSubmitOptForm}
        onClickNewPasswordForm={onSubmitNewPasswordForm}
        onClose={handleClose}
        step={step}
        onTimeout={timeOut}
        isTimeOut={isTimeOut}
        setIsTimeOut={setIsTimeOut}
        toggleResend={toggleResend}
      />
    </Box>,
    <Box className={page === 3 ? styles.slideRight : ''}>
      <Box marginTop="60px">
        <TermAndCondition />
      </Box>
    </Box>,
  ];
  return (
    <>
      {isShowLogin && (
        <Modal open={isShowLogin} aria-labelledby="image-gallery-title" aria-describedby="image-gallery-description" closeAfterTransition>
          <Zoom in={isShowLogin}>
            <Paper ref={formContainer} style={{ height: '100%', padding: '16px', overflowX: 'auto' }}>
              {isLoading && (
                <div className={styles.overlay}>
                  <LoadingScreen />
                </div>
              )}
              {page === 1 && (
                <Box className={styles.headerSignUp}>
                  <Grid container xs={12} item justifyContent="space-between">
                    <Grid item xs={2} className={styles.iconButton}>
                      <IconButton
                        aria-label="close"
                        className="icon"
                        onClick={() => {
                          router.replace('/');
                          setPage(page - 1);
                        }}
                      >
                        <ArrowBackIosIcon />
                      </IconButton>
                    </Grid>
                    <Grid item={10} className={styles.desc}>
                      <p>
                        Đã có tài khoản?{' '}
                        <Box
                          component="span"
                          className="login"
                          onClick={() => {
                            router.replace('/');
                            setPage(page - 1);
                          }}
                        >
                          Đăng nhập
                        </Box>
                      </p>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {page === 2 && (
                <Box className={styles.headerSignUp}>
                  <Grid container xs={12} item justifyContent="space-between">
                    <Grid item xs={2} className={styles.iconButton}>
                      <IconButton aria-label="close" className="icon" onClick={handleClose}>
                        <CloseOutlinedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {page === 3 && (
                <Box className={styles.headerSignUp}>
                  <Grid container xs={12} item justifyContent="space-between">
                    <Grid item xs={2} className={styles.iconButton}>
                      <IconButton aria-label="close" className="icon" onClick={handleCloseTerms}>
                        <CloseOutlinedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {componentList[page]}
            </Paper>
          </Zoom>
        </Modal>
      )}
      {isShowSignUp && (
        <Modal open={isShowSignUp} aria-labelledby="image-gallery-title" aria-describedby="image-gallery-description" closeAfterTransition>
          <Zoom in={isShowSignUp}>
            <Paper ref={formContainer} style={{ height: '100%', padding: '16px', overflowX: 'auto' }}>
              {isLoading && (
                <div className={styles.overlay}>
                  <LoadingScreen />
                </div>
              )}
              {page === 1 && (
                <Box className={styles.headerSignUp}>
                  <Grid container xs={12} item justifyContent="space-between">
                    <Grid item xs={2} className={styles.iconButton}>
                      <IconButton
                        aria-label="close"
                        className="icon"
                        onClick={() => {
                          router.replace('/');
                          setPage(page - 1);
                        }}
                      >
                        <ArrowBackIosIcon />
                      </IconButton>
                    </Grid>
                    <Grid item={10} className={styles.desc}>
                      <p>
                        Đã có tài khoản?{' '}
                        <Box
                          component="span"
                          className="login"
                          onClick={() => {
                            router.replace('/');
                            setPage(page - 1);
                          }}
                        >
                          Đăng nhập
                        </Box>
                      </p>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {page === 2 && (
                <Box className={styles.headerSignUp}>
                  <Grid container xs={12} item justifyContent="space-between">
                    <Grid item xs={2} className={styles.iconButton}>
                      <IconButton aria-label="close" className="icon" onClick={handleClose}>
                        <CloseOutlinedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {page === 3 && (
                <Box className={styles.headerSignUp}>
                  <Grid container xs={12} item justifyContent="space-between">
                    <Grid item xs={2} className={styles.iconButton}>
                      <IconButton aria-label="close" className="icon" onClick={handleCloseTerms}>
                        <CloseOutlinedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {componentList[page]}
            </Paper>
          </Zoom>
        </Modal>
      )}
    </>
  );
};

//   openNewLogin && (
//     <Modal open={openNewLogin} aria-labelledby="image-gallery-title" aria-describedby="image-gallery-description" closeAfterTransition>
//       <Zoom in={openNewLogin}>
//         <Paper ref={formContainer} style={{ height: '100%', padding: '16px', overflowX: 'auto' }}>
//           {isLoading && (
//             <div className={styles.overlay}>
//               <LoadingScreen />
//             </div>
//           )}
//           {page === 1 && (
//             <Box className={styles.headerSignUp}>
//               <Grid container xs={12} item justifyContent="space-between">
//                 <Grid item xs={2} className={styles.iconButton}>
//                   <IconButton
//                     aria-label="close"
//                     className="icon"
//                     onClick={() => {
//                       router.replace('/');
//                       setPage(page - 1);
//                     }}
//                   >
//                     <ArrowBackIosIcon />
//                   </IconButton>
//                 </Grid>
//                 <Grid item={10} className={styles.desc}>
//                   <p>
//                     Đã có tài khoản?{' '}
//                     <Box
//                       component="span"
//                       className="login"
//                       onClick={() => {
//                         router.replace('/');
//                         setPage(page - 1);
//                       }}
//                     >
//                       Đăng nhập
//                     </Box>
//                   </p>
//                 </Grid>
//               </Grid>
//             </Box>
//           )}
//           {page === 2 && (
//             <Box className={styles.headerSignUp}>
//               <Grid container xs={12} item justifyContent="space-between">
//                 <Grid item xs={2} className={styles.iconButton}>
//                   <IconButton aria-label="close" className="icon" onClick={handleClose}>
//                     <CloseOutlinedIcon />
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             </Box>
//           )}
//           {page === 3 && (
//             <Box className={styles.headerSignUp}>
//               <Grid container xs={12} item justifyContent="space-between">
//                 <Grid item xs={2} className={styles.iconButton}>
//                   <IconButton aria-label="close" className="icon" onClick={handleCloseTerms}>
//                     <CloseOutlinedIcon />
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             </Box>
//           )}
//           {componentList[page]}
//         </Paper>
//       </Zoom>
//     </Modal>
//   );
// }
// {
//   openSignupV2 && (
//     <Modal open={openSignupV2} aria-labelledby="image-gallery-title" aria-describedby="image-gallery-description" closeAfterTransition>
//       <Zoom in={openSignupV2}>
//         <Paper ref={formContainer} style={{ height: '100%', padding: '16px', overflowX: 'auto' }}>
//           {isLoading && (
//             <div className={styles.overlay}>
//               <LoadingScreen />
//             </div>
//           )}
//           {page === 1 && (
//             <Box className={styles.headerSignUp}>
//               <Grid container xs={12} item justifyContent="space-between">
//                 <Grid item xs={2} className={styles.iconButton}>
//                   <IconButton
//                     aria-label="close"
//                     className="icon"
//                     onClick={() => {
//                       router.replace('/');
//                       setPage(page - 1);
//                     }}
//                   >
//                     <ArrowBackIosIcon />
//                   </IconButton>
//                 </Grid>
//                 <Grid item={10} className={styles.desc}>
//                   <p>
//                     Đã có tài khoản?{' '}
//                     <Box
//                       component="span"
//                       className="login"
//                       onClick={() => {
//                         router.replace('/');
//                         setPage(page - 1);
//                       }}
//                     >
//                       Đăng nhập
//                     </Box>
//                   </p>
//                 </Grid>
//               </Grid>
//             </Box>
//           )}
//           {page === 2 && (
//             <Box className={styles.headerSignUp}>
//               <Grid container xs={12} item justifyContent="space-between">
//                 <Grid item xs={2} className={styles.iconButton}>
//                   <IconButton aria-label="close" className="icon" onClick={handleClose}>
//                     <CloseOutlinedIcon />
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             </Box>
//           )}
//           {page === 3 && (
//             <Box className={styles.headerSignUp}>
//               <Grid container xs={12} item justifyContent="space-between">
//                 <Grid item xs={2} className={styles.iconButton}>
//                   <IconButton aria-label="close" className="icon" onClick={handleCloseTerms}>
//                     <CloseOutlinedIcon />
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             </Box>
//           )}
//           {componentList[page]}
//         </Paper>
//       </Zoom>
//     </Modal>
//   );

export default PopupFullScreen;
