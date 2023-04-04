import { Button, Modal, Paper, Stack } from '@material-ui/core'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CSList from '../ForwardConversationPopup/CSList';
import { APIStatus } from '../../lib/common';
import { forwardConversation } from '../../services/ChatService';
import { useSnackbar } from 'notistack';
import MyButton, { MY_BUTTON_COLOR, MY_BUTTON_TYPE } from '../Button/MyButton';

const CustomTextField = styled(TextField)(({ theme }) => ({
    height: '100%',
    '& .MuiFormHelperText-root':{
        marginLeft: '00px'
    },
    '& .MuiOutlinedInput-root':{
        height: '100%',
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.green,
        },
    }
}),);
const forwardConversationFunc = async(accountId, conversationID) => {
    const res = await forwardConversation({
        data: {
            customerSupportID: accountId, 
            conversationID,
            sessionID: "63564f21710fd2fc463bad93"
        }
    })
    return res
}
const forwardFunc = (accountId, conversationID) => {
    return new Promise((resolve, reject) => {
        resolve(forwardConversationFunc(accountId, conversationID))
    })
}

function ConversationForward({open, onClose, listTopicID, setListTopicID, topicsSorted, setTopicsSorted}) {
    const { enqueueSnackbar } = useSnackbar();
    const [search, setSearch] = useState("");
	const [selectedItem, setSelectedItem] = useState(null);
	const handleChange = (e) => {
		if(e && e.target){
			setSearch(e.target.value)
		}
	}

	const onForward = (accountId, fullName) => {
        let promises = []
		listTopicID.forEach(item => {
            promises.push(forwardFunc(accountId, item))
        })
        Promise.all(promises).then(res => {
            res.forEach(item => {
                if (item.status == APIStatus.OK){
                    enqueueSnackbar("Chuyển tiếp thành công",{ variant: 'success' })
                    topicsSorted.map(item2 => {
                        if (item2.conversationID == item.data[0].conversationID){
                            item2.customerSupportID = item.data[0].newCustomerSupportID
                            item2.customerSupportName = fullName
                        }
                    })
                    setTopicsSorted([...topicsSorted])
                } else {
                    enqueueSnackbar("Chuyển tiếp thất bại!",{ variant: 'error' })
                }
            })
        })

		setSearch("");
        setListTopicID([]);
		onClose();
	}

	useEffect(() => {
		if (!open) {
			setSearch("")
			setSelectedItem(null);
		}
	}, [open])

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems:"center",
			}}
		>
			<Paper
				variant='outlined'
				sx={{
					textAlign:"left",
					minWidth: 400,
				}}
			>
				<Box
					sx={{
						fontSize: "1.2rem",
						color: "#15A959",
						borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
						padding: "1rem"
					}}
				>Danh sách nhân viên hỗ trợ</Box>
				<Box
					sx={{
						padding: "1rem",
						paddingTop: 0,
						paddingBottom: "0.5rem"
					}}
				>
					<CustomTextField
						fullWidth
						size="small"
						margin="dense"
						type="text"
						placeholder='Tìm kiếm nhân viên'
						onChange={handleChange}
					></CustomTextField>
					<CSList
						propsName={search}
						onItemClick={onForward}
						setSelectedItem={setSelectedItem}
						selectedItem={selectedItem}
					></CSList>
				</Box>
				<Stack
					direction="row"
					justifyContent="flex-end"
					spacing={1}
					sx={{
						padding: "1rem",
						borderTop: "1px solid rgba(0, 0, 0, 0.54)",
						boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
					}}
				>
					<MyButton
						type={MY_BUTTON_TYPE.CONTAINED}
						color={MY_BUTTON_COLOR.NORMAL}
						disableElevation
						sx={{
							color:"#000",
						}}
						onClick={onClose}
					>
						Đóng
					</MyButton>
					<MyButton
						type={MY_BUTTON_TYPE.CONTAINED}
						color={MY_BUTTON_COLOR.SUCCESS}
						disableElevation
						disabled={!selectedItem}
						onClick={() => {
							if (selectedItem) {
								onForward(selectedItem.accountId, selectedItem.fullname)
							}
						}}
					>
						Xác nhận
					</MyButton>
				</Stack>
			</Paper>
		</Modal>
	)
}

export default ConversationForward