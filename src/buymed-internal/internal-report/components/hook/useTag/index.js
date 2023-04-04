import { APIStatus } from "lib/common";
import getConfig from "next/config";

import { useState, useEffect, useRef, useCallback } from "react";

import {
	isStartTag,
	searchTagCode,
	startTagAt,
	startTagMenuCommandAt,
	TagCode,
	tagList,
} from "services/ChatTagService";
import { orderUrl } from "services/OrderService";
import { ticketUrl } from "services/TicketService";
import {
	insertToString,
	replaceCaseInsensitive,
	replaceCaseInsensitiveAll,
	splitTextMessage,
} from "utilities/string";

const { publicRuntimeConfig } = getConfig();

const handleURL = (url) => {};

export const useTag = ({
	caretRef,
	getProductBySlug,
	getOrderByID,
	getTicketByID,
	tagDisabled,
	isDisabled,
}) => {
	const [selectedTagItem, setSelectedTagItem] = useState(null);
	const [openTagMenu, setOpenTagMenu] = useState(false);
	const [tagMenu, setTagMenu] = useState(tagList);
	const [searchText, setSearchText] = useState("");
	const [textMessage, setTextMessage] = useState("");
	const [selectedTagMenuItem, setSelectedTagMenuItem] = useState(null);
	const [anotherOpen, setAnotherOpen] = useState(false);
	const lastState = useRef(null);

	lastState.current = {
		selectedTagItem,
		openTagMenu,
		selectedTagMenuItem,
		textMessage,
		searchText,
		tagMenu,
	};

	const getState = useCallback(() => {
		return lastState.current;
	}, []);
	const handleChangeMessage = async (value) => {
		let newValue = value;
		if (tagDisabled || anotherOpen) {
			setTextMessage(newValue);
			return;
		}

		if (!selectedTagItem || true) {
			const startCommand = startTagMenuCommandAt(value);
			if (startCommand >= 0) {
				const end = newValue.indexOf("\n", startCommand);
				let tagCode = [];
				if (end <= startCommand) {
					tagCode = searchTagCode(newValue.substring(startCommand));
				} else {
					tagCode = searchTagCode(newValue.substring(startCommand, end));
				}
				if (tagCode.length > 0) {
					setOpenTagMenu(true);
				}
				setTagMenu(tagCode);
			} else {
				setOpenTagMenu(false);
				setTagMenu(tagList);
			}

			const lines = splitTextMessage(newValue);
			const n = lines.length;
			let tag = null;
			for (let i = 0; i < n; i++) {
				tag = isStartTag(lines[i]);
				if (tag) {
					setSelectedTagMenuItem(tag);
					break;
				}
			}
			if (!tag) {
				setSelectedTagMenuItem(null);
			}
			if (newValue.indexOf(`${publicRuntimeConfig.HTTP_WEB_HOST}/product/`) >= 0) {
				newValue = replaceCaseInsensitiveAll(
					newValue,
					`${publicRuntimeConfig.HTTP_WEB_HOST}/product/`,
					`${publicRuntimeConfig.WEB_HOST}/product/`
				);
			}
			if (newValue.indexOf(`${publicRuntimeConfig.HTTP_WEB_HOST}/my-order/`) >= 0) {
				newValue = replaceCaseInsensitiveAll(
					newValue,
					`${publicRuntimeConfig.HTTP_WEB_HOST}/my-order/`,
					`${publicRuntimeConfig.WEB_HOST}/my-order/`
				);
			}
			if (newValue.indexOf(`${publicRuntimeConfig.HTTP_WEB_HOST}/users/my-ticket/`) >= 0) {
				newValue = replaceCaseInsensitiveAll(
					newValue,
					`${publicRuntimeConfig.HTTP_WEB_HOST}/users/my-ticket`,
					`${publicRuntimeConfig.WEB_HOST}/users/my-ticket`
				);
			}
			let linkIndexProduct = newValue.indexOf(`${publicRuntimeConfig.WEB_HOST}/product/`);
			let linkIndexOrder = newValue.indexOf(`${publicRuntimeConfig.WEB_HOST}/my-order/`);
			let linkIndexTicket = newValue.indexOf(
				`${publicRuntimeConfig.WEB_HOST}/users/my-ticket`
			);
			if (linkIndexProduct >= 0) {
				const id = newValue.substring(
					linkIndexProduct + `${publicRuntimeConfig.WEB_HOST}/product/`.length
				);
				getProductBySlug(id).then((product) => {
					if (product.status === APIStatus.OK) {
						setSelectedTagItem({
							item: product.data[0],
							tag: tagList[tagList.findIndex((item) => item.code === TagCode.SP)],
						});
						setTextMessage(() => {
							return replaceCaseInsensitiveAll(
								newValue,
								`${publicRuntimeConfig.WEB_HOST}/product/${id}`,
								""
							);
						});
					} else {
						setTextMessage(newValue);
					}
				});
			} else if (linkIndexOrder >= 0) {
				const id = newValue.substring(
					linkIndexProduct + `${publicRuntimeConfig.WEB_HOST}/my-order/`.length
				);
				getOrderByID(id).then((order) => {
					if (order.status === APIStatus.OK) {
						setSelectedTagItem({
							item: order.data[0],
							tag: tagList[tagList.findIndex((item) => item.code === TagCode.DH)],
						});
						setTextMessage(() => {
							return replaceCaseInsensitiveAll(
								newValue,
								`${publicRuntimeConfig.WEB_HOST}/my-order/${id}`,
								""
							);
						});
					} else {
						setTextMessage(newValue);
					}
				});
			} else if (linkIndexTicket >= 0) {
				const id = newValue.substring(
					linkIndexTicket + `${publicRuntimeConfig.WEB_HOST}/users/my-ticket?id=`.length
				);
				const intID = parseInt(id);
				getTicketByID(intID || intID === 0 ? intID : id).then((ticket) => {
					if (ticket.status === APIStatus.OK) {
						setSelectedTagItem({
							item: ticket.data[0],
							tag: tagList[tagList.findIndex((item) => item.code === TagCode.HOTRO)],
						});
						setTextMessage(() => {
							return replaceCaseInsensitiveAll(
								newValue,
								`${publicRuntimeConfig.WEB_HOST}/users/my-ticket?id=${id}`,
								""
							);
						});
					} else {
						setTextMessage(newValue);
					}
				});
			} else {
				setTextMessage(newValue);
			}
			// const res = startTagAt(newValue);
			// if(res){
			//     const {start, tag: tagCode} = res;
			//     const end = newValue.indexOf("\n", start);
			//     let searchString = ""
			//     if(end <= start){
			//         searchString = newValue.substring(start + tagCode.length);
			//     }
			//     else{
			//         searchString = newValue.substring(start + tagCode.length, end)
			//     }
			//     setSearchText(searchString);
			// }
		} else if (false) {
			const { tag, item } = selectedTagItem;
			let flag = false;
			switch (tag.code) {
				case TagCode.SP: {
					if (
						!newValue.includes(`${tag.code}${item.product.name}`) &&
						!newValue.includes(
							`${publicRuntimeConfig.WEB_HOST}/product/${item.skuItem.slug}`
						)
					) {
						setSelectedTagItem(null);
						flag = true;
					}
					break;
				}
				case TagCode.DH: {
					if (
						!newValue.includes(`${tag.code}${item.orderId || item.orderID}`) &&
						!newValue.includes(orderUrl(item))
					) {
						setSelectedTagItem(null);
						flag = true;
					}
					break;
				}
				case TagCode.HOTRO: {
					if (
						!newValue.includes(`${tag.code}${item.code}`) &&
						!newValue.includes(ticketUrl(item))
					) {
						setSelectedTagItem(null);
						flag = true;
					}
					break;
				}
				default:
					break;
			}
			if (flag) {
				const startCommand = startTagMenuCommandAt(value);
				if (startCommand >= 0) {
					const end = newValue.indexOf("\n", startCommand);
					let tagCode = [];
					if (end <= startCommand) {
						tagCode = searchTagCode(newValue.substring(startCommand));
					} else {
						tagCode = searchTagCode(newValue.substring(startCommand, end));
					}
					if (tagCode.length > 0) {
						setOpenTagMenu(true);
					}
					setTagMenu(tagCode);
				} else {
					setOpenTagMenu(false);
					setTagMenu(tagList);
				}

				const lines = splitTextMessage(newValue);
				const n = lines.length;
				let tag = null;
				for (let i = 0; i < n; i++) {
					tag = isStartTag(lines[i]);
					if (tag) {
						setSelectedTagMenuItem(tag);
						break;
					}
				}
				if (!tag) {
					setSelectedTagMenuItem(null);
				}
			}
		}
		const res = startTagAt(newValue);
		if (res) {
			const { start, tag: tagCode } = res;
			const end = newValue.indexOf("\n", start);
			let searchString = "";
			if (end <= start) {
				searchString = newValue.substring(start + tagCode.length);
			} else {
				searchString = newValue.substring(start + tagCode.length, end);
			}
			setSearchText(searchString);
		}
	};

	const handleSelectTagItem = (item, text) => {
		// setTextMessage(prev => {
		//     let index = 0;
		//     index = startTagAt(prev, selectedTagMenuItem.code).start;
		//     const end = prev.indexOf("\n", index);
		//     const newStr = selectedTagMenuItem.code + text;
		//     if(end <= index){
		//         return prev.replace(prev.substring(index), newStr) + "\n\n";
		//     }
		//     const old = prev.substring(index, end);
		//     const result = prev.replace(old, newStr);
		//     return result + "\n\n";
		// });
		setTextMessage("");
		setSelectedTagItem({
			item: item,
			tag: selectedTagMenuItem,
		});
		setSelectedTagMenuItem(null);
	};

	const handleCloseTag = () => {
		setSelectedTagItem(null);
	};

	const resetState = () => {
		setSelectedTagItem(null);
		setSelectedTagMenuItem(null);
		setTextMessage("");
		setSelectedTagItem(null);
		setSearchText("");
	};

	const toggleTagMenu = () => {
		if (!selectedTagMenuItem) {
			setOpenTagMenu((prev) => !prev);
		}
		setSelectedTagMenuItem(null);
	};

	const closeTagMenu = () => {
		setOpenTagMenu(false);
		setSelectedTagMenuItem(null);
	};

	const handleSelectMenuItem = (item) => {
		setSelectedTagMenuItem(item);
		setTextMessage((prev) => {
			const startCommand = startTagMenuCommandAt(prev);
			if (startCommand >= 0) {
				const end = prev.indexOf("\n", startCommand);
				let tagCode = [];
				if (end <= startCommand) {
					return prev.replace(prev.substring(startCommand), item.code);
				} else {
					return prev.replace(prev.substring(startCommand, end), item.code);
				}
			}
			return insertToString(prev, caretRef.current || 0, item.code);
		});
	};

	const changeSearchText = (value) => {
		setTextMessage((prev) => {
			let newValue = prev;
			const res = startTagAt(newValue);
			if (res) {
				const { start, tag: tagCode } = res;
				const end = newValue.indexOf("\n", start);
				let searchString = null;
				if (end <= start) {
					searchString = newValue.substring(start);
				} else {
					searchString = newValue.substring(start, end);
				}
				newValue = replaceCaseInsensitive(newValue, searchString, tagCode + value);
				return newValue;
			}
		});

		setSearchText(value);
	};

	useEffect(() => {
		if (selectedTagMenuItem) {
			setOpenTagMenu(false);
		}
	}, [selectedTagMenuItem]);

	useEffect(() => {
		if (!openTagMenu) {
			setTagMenu(tagList);
			setSearchText("");
		}
	}, [openTagMenu]);

	return {
		resetState,
		handleChangeMessage,
		handleSelectTagItem,
		handleSelectMenuItem,
		toggleTagMenu,
		handleCloseTag,
		textMessage,
		openTagMenu,
		tagMenu,
		searchText,
		selectedTagItem,
		selectedTagMenuItem,
		setTextMessage,
		changeSearchText,
		getState,
		closeTagMenu,
		setAnotherOpen,
	};
};
