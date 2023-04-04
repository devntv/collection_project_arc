import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Stack from '@mui5/Stack/Stack'
import Fade from '@material-ui/core/Fade'
import { SnackbarProvider } from 'notistack'

import Sidebar from './InternalLayout/Sidebar/Sidebar';
import InteralNav from './InternalLayout/MuiNav';
import Loading from './Loading/Loading';
import Meta from './Element/Meta';
import AppContext from '../context'

import { APIStatus } from '../lib/common'
import { getCookie } from 'cookies-next'
import ScrollToTop from './Element/ScrollToTop'
import { getMe as GetAccountMe } from '../services/AccountService'
import { getMe as GetCustomerMe } from '../services/CustomerService'
import { getAvatarRandomColor } from '../utilities/color'
import PermissionProvider from './PermissionProvider/PermissionProvider'
import { getPathNestRoutes } from '../utilities'
import MyDrawer from './Layout/MyDrawer'
import LoginModal from './Login/LoginModal'
import { drawerMinWidth, drawerWidth } from '../config/drawer-setting'
import SiteBreadcrumbs from './Element/SiteBreadcrumbs'
import PageTittle from './Layout/PageTittle'
import Footer from './Layout/Footer'
import MuiNav from './Layout/MuiNav'
import { DEFAULT_CHAT_PAGE_TITLE } from '../config/chat'

const defaultUser = {
    username: null,
    accountID: null,
    sessionToken: null,
    type: null,
    avatarColor: getAvatarRandomColor(),
    sessionId: "",
}

const Layout = ({
    children,
    navbarMenu,
    title,
    isInternal,
    loggedInUserInfo,
    chatPermission,
    breadCrumbs,
    disabledBreadCrumb,
    typePage,
    defaultTitle,
}) => {
    const [pageTitle, setPageTitle] = useState(title);
    const [user, setUser] = useState(defaultUser);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isExtraSmallScreen, setIsExtraSmallScreen] = useState(false);
    const [currentRoute, setCurrentRoute] = useState("");
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [enableBreadCrumb, setEnableBreadCrumb] = useState(!disabledBreadCrumb);

    const router = useRouter();

    useEffect(()=>{
        setEnableBreadCrumb(!disabledBreadCrumb)
    },[disabledBreadCrumb])

    useEffect(() => {
        if (loggedInUserInfo) {
            const cloneOfUser = { ...defaultUser };
            cloneOfUser.accountID = loggedInUserInfo.account.accountId
            cloneOfUser.sessionToken = loggedInUserInfo.session?.token
            cloneOfUser.username = loggedInUserInfo.account.username
            cloneOfUser.type = loggedInUserInfo.account.type;
            cloneOfUser.fullname = loggedInUserInfo.account.fullname;
            setUser(prev => ({
                ...prev,
                ...cloneOfUser,
            }));
            setCurrentRoute(getPathNestRoutes(router)[0])
            setOpenLoginModal(false)
        }
        else {
            router.push("/login")
        }
    }, [loggedInUserInfo, children])


    useEffect(()=>{
        setPageTitle(title)
    },[title])



    const toggleOpen = () => {
        setOpenDrawer(!openDrawer);
    }

    const handlerResize = () => {
        if (window.innerWidth <= 600) {
            setOpenDrawer(false);
            setIsExtraSmallScreen(true);
        }
        else {
            setIsExtraSmallScreen(false);
        }
    }

    const handleCloseLoginModal = () => {
        setOpenLoginModal(false)
    }

    const handleOpenLoginModal = () => {
        setOpenLoginModal(true)
    }

    useEffect(() => {
        if (window.innerWidth <= 600) {
            setOpenDrawer(false);
            setIsExtraSmallScreen(true);
        }
        window.addEventListener("resize", handlerResize);
        return () => {
            window.removeEventListener("resize", handlerResize);
        }
    }, [])

    if (!user.fullname) {
        return "";
    }

    const addSessionId = (id) => {
        setUser(prev => ({
            ...prev,
            sessionId: id,
        }))
    }

    return (
        <AppContext.Provider value={{
            user,
            addSessionId,
            loggedInUserInfo,
            setEnableBreadCrumb,
        }}>
            <PermissionProvider
                user={user}
                chatPermission={chatPermission || null}
                typePage={typePage}
            >
                <Meta pageTitle={pageTitle ? (pageTitle.toLowerCase() === "chat" ? DEFAULT_CHAT_PAGE_TITLE : typePage === 'EMS' ? defaultTitle : pageTitle) : null}/>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    autoHideDuration={1000}
                    TransitionComponent={Fade}
                >
                    <Box
                        sx={{
                            display: "flex",
                            height: "100vh",
                            flexDirection: 'column',
                        }}
                    >
                        {!isInternal ? (
                            <>
                                {user.fullname ?
                                    isExtraSmallScreen ?
                                        <MyDrawer currentRoute={currentRoute} toggleDrawer={toggleOpen} isOverlay open={openDrawer}></MyDrawer>
                                        :
                                        <MyDrawer currentRoute={currentRoute} open={openDrawer} ></MyDrawer>
                                    : ""
                                }
                                <MuiNav
                                    marginLeft={
                                        (isExtraSmallScreen || !user.fullname) ? 0 : openDrawer ? drawerWidth : drawerMinWidth
                                    }
                                    toggleDrawer={toggleOpen}
                                    handleOpenLoginModal={handleOpenLoginModal}
                                ></MuiNav>
                                <LoginModal open={openLoginModal} handleClose={handleCloseLoginModal}></LoginModal>
                            </>
                        ) : (
                            <>
                                <Sidebar handleClose={() => { setOpenDrawer(false) }} open={openDrawer}></Sidebar>
                                <InteralNav
                                    chatPermission={chatPermission}
                                    typePage={typePage}
                                    navbarMenu={navbarMenu}
                                    title={title}
                                    marginLeft={0}
                                    toggleDrawer={toggleOpen}
                                ></InteralNav>
                            </>
                        )}

                        <Box
                            component="main"
                            sx={{
                                marginLeft: `${(isInternal || isExtraSmallScreen || !user.fullname) ? 0 : openDrawer ? drawerWidth : drawerMinWidth}px`,
                                transition: 'margin-left 0.195s',
                                flex: "1 1 auto",
                                position: 'relative',
                                paddingTop: disabledBreadCrumb ? '1.1rem' : 0,
                                background: (theme) => theme.palette.bodyBg,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {enableBreadCrumb && (
                                <Stack marginY={"8px"} marginX="20px" spacing={"0.3rem"}>
                                                                
                                    <SiteBreadcrumbs disabledBreadCrumb={!!disabledBreadCrumb} breadCrumbs={breadCrumbs}></SiteBreadcrumbs>
                                    {/* <PageTittle title={currentRoute}></PageTittle> */}
                                </Stack>
                            )}
                           
                            <Paper variant='outlined'
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    background: 'white',
                                    flex: "1 1 auto",
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                }}

                            >
                                {/* <SiteBreadcrumbs></SiteBreadcrumbs> */}
                                {children}
                            </Paper>
                            <Loading ></Loading>
                        </Box>
                        <ScrollToTop></ScrollToTop>
                        {!isInternal && (
                            <Box
                                component="footer"
                                sx={{
                                    marginLeft: `${(isExtraSmallScreen || !user.username) ? 0 : openDrawer ? drawerWidth : drawerMinWidth}px`,
                                    transition: 'margin-left 0.195s',
                                    flex: "0 1 auto",
                                }}
                            >
                                <Footer />
                            </Box>
                        )}
                    </Box>
                </SnackbarProvider>

            </PermissionProvider>


        </AppContext.Provider>
    );
}

export default Layout;