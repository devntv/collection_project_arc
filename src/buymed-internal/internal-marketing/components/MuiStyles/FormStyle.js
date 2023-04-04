import { makeStyles } from "@material-ui/core";

export const useFormStyles = makeStyles(theme => ({
    fieldLabel: {
        fontWeight: "bold",
    },
    required: {
        "&:after": {
            content: ` "*"`,
            color: "red",
        }
    },
    readOnlyInfoCard: {
        borderRadius: 16,
        border: "none",
        backgroundColor: theme.palette.grey[100]
    },
    tableFooter: {
        "& td": {
            borderBottom: "none",
        },
        "& tr:last-child td": {
            borderBottom: "1px solid",
            borderBottomColor: theme.palette.divider,
        }
    },
    helperText: {
        ...theme.typography.body2,
        fontStyle: "italic",
    },
    secondaryIconButton: {
        "&:hover": {
            color: theme.palette.secondary.main,
        }
    },

}));