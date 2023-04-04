import { styled } from '@material-ui/core/styles';
const BoxWrapDrawer = styled('div', { shouldForwardProp: (prop) => (prop !== 'open' && prop !== 'drawerWidth') })(
    ({ theme, open, drawerWidth }) => ({
        width: "100%",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            width: `calc(100% - ${drawerWidth}px)`
        }),
    }),
);

export default BoxWrapDrawer;