import React, { useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { styled } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import Stack from '@mui5/Stack/Stack'
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { getUserActionByPermission, PERMISSION, PERMISSION_ACTION } from '../../utilities/permission';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const PermissionForm = ({ user, control }) => {

    const [checkValues, setCheckValues] = useState(user ? [...user.permissions] : []);


    const actionChipList = useMemo(() => {
        return getUserActionByPermission(checkValues).map((item) => {
            return (
                <ListItem
                    key={item}
                >
                    <Chip
                        key={item}
                        label={item}

                    ></Chip>
                </ListItem>

            )
        })
    }, [checkValues])

    return (
        <Box>
            <Box
                sx={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    marginTop:"1rem"
                }}
            >
                Quyền hạn:
            </Box>
            <Grid container>
                <Controller
                    name='permissions'
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            {Object.keys(PERMISSION).map((option, index) => {
                                return (
                                    <Grid
                                        key={option}
                                        item
                                        xs={12} sm={12} md={6}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={(e) => {
                                                        const valueClone = [...checkValues];
                                                        const index1 = [...checkValues].findIndex(item => item === e.target.value);
                                                        if(index1 < 0){
                                                            valueClone.push(e.target.value);
                                                        }
                                                        else{
                                                            valueClone[index1] = e.target.checked ? e.target.value : null;
                                                        }
                                                        const result = valueClone.filter(item => item)
                                                        onChange(result);
                                                        setCheckValues(result);
                                                    }}
                                                    value={option}
                                                    checked={checkValues.includes(option)}
                                                />
                                            }
                                            label={option}
                                        />
                                    </Grid>
                                )
                            })}
                        </>
                    )}
                >
                </Controller>
            </Grid>
            <Paper
                variant='outlined'
                sx={{
                    padding: "1rem",
                    height: "23rem",
                    marginTop:"1rem",
                    overflow:"auto"
                }}
            >
                <Box
                    sx={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                    }}
                >
                    Hành động tương ứng:

                </Box>
                <Stack
                    direction="row"
                    sx={{
                        marginTop: "1rem",
                        flexWrap: "wrap"
                    }}
                >
                    {actionChipList}
                </Stack>
            </Paper>
        </Box>
    )
}

export default PermissionForm