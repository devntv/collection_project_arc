import { styled } from '@material-ui/core/styles';
import  TextField  from '@material-ui/core/TextField'

export const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiFormHelperText-root':{
        marginLeft: '00px'
    },
    '& .MuiOutlinedInput-root':{
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.green,
        },
    }
}),);