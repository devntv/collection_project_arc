import React from 'react'
import Button from "@material-ui/core/Button";

export const MY_BUTTON_COLOR = {
    SUCCESS: "SUCCESS",
    WARNING: "WARNING",
    DANGER: "DANGER",
    PRIMARY: "PRIMARY",
    NORMAL: "NORMAL"
}

export const MY_BUTTON_TYPE = {
    CONTAINED: "CONTAINED",
    OUTLINED: "OUTLINED"
}

const BUTTON_COLOR = {
    [MY_BUTTON_COLOR.SUCCESS]: {
        [MY_BUTTON_TYPE.CONTAINED]: {
            background: "#15A959",
            "&:hover": {
                background: "#10763f",
            }
        },
        [MY_BUTTON_TYPE.OUTLINED]: {
            borderColor: "#15A959",
            "&:hover": {
                borderColor: "#10763f",
            }
        },
    },
    [MY_BUTTON_COLOR.WARNING]: {
        [MY_BUTTON_TYPE.CONTAINED]: {
            background: "#ff8442",
            "&:hover": {
                background: "#d7540e",
            }
        },
        [MY_BUTTON_TYPE.OUTLINED]: {
            borderColor: "#ff8442",
            "&:hover": {
                borderColor: "#d7540e",
            }
        },
    },
    [MY_BUTTON_COLOR.DANGER]: {
        [MY_BUTTON_TYPE.CONTAINED]: {
            background: "#d32f2f",
            "&:hover": {
                background: "#b03131",
            }
        },
        [MY_BUTTON_TYPE.OUTLINED]: {
            borderColor: "#d32f2f",
            "&:hover": {
                borderColor: "#b03131",
            }
        },
    },
    [MY_BUTTON_COLOR.PRIMARY]: {
        [MY_BUTTON_TYPE.CONTAINED]: {
            background: "#1A73B8",
            "&:hover": {
                background: "#125589",
            }
        },
        [MY_BUTTON_TYPE.OUTLINED]: {
            borderColor: "#1A73B8",
            "&:hover": {
                borderColor: "#125589",
            }
        },

    },
    [MY_BUTTON_COLOR.NORMAL]: {
        [MY_BUTTON_TYPE.CONTAINED]: {
            background: "#e0e0e0",
            "&:hover": {
                background: "#a4a4a4",
            }
        },
        [MY_BUTTON_TYPE.OUTLINED]: {
            borderColor: "#e0e0e0",
            "&:hover": {
                borderColor: "#a4a4a4",
            }
        },
    },
}

const MyButton = (props) => {
    const copyProps = { ...props };
    const { type, color, sx, children, isSubmitButton } = props;
    delete copyProps.type;
    delete copyProps.color;
    delete copyProps.isSubmitButton;
    const style = (()=>{
        if(BUTTON_COLOR[color]){
            return BUTTON_COLOR[color][type] || BUTTON_COLOR[color][MY_BUTTON_TYPE.CONTAINED]
        }
        return BUTTON_COLOR[MY_BUTTON_COLOR.PRIMARY][MY_BUTTON_TYPE.CONTAINED]
    })()
    return (
        <Button
            {...copyProps}
            variant={(MY_BUTTON_TYPE[type] || MY_BUTTON_TYPE.CONTAINED).toLowerCase()}
            style={{
                border: "1px solid #e9e9e9",
                borderRadius: "0.5rem",
                color: "#fff",
                whiteSpace: "nowrap",
                ...style,
                ...sx,
            }}
            type={isSubmitButton ? "submit" : "button"}
        >
            {children}
        </Button>
    )
}

export default MyButton