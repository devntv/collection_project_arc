import React, { createContext, useContext, useEffect, useState } from "react";
import * as colorDic from "@material-ui/core/colors";
import AppContext from "../../context";

export const MemberContext = createContext();
const MemberProvider = ({ memberDictionary, children }) => {
	const [dictionary, setDictionary] = useState(memberDictionary);
	const [colorHash, setColorHash] = useState({});
	const {user} = useContext(AppContext)
	const [colors] = useState(() => {
		const a = Object.keys(colorDic).map((item) => {
			delete colorDic[item][900];
			delete colorDic[item][800];
			return colorDic[item];
		}).filter(item => item);
		a.shift();
		return a;
	});
	const getColor = (id) => {
		let color = "black";
		if(id === user.accountID){
			return user.avatarColor;
		}
		if(user.type === 'CUSTOMER') {
			return 'white';
		}
		try {
			if (colorHash[id]) {
				color = colors[colorHash[id].index][colorHash[id].value];
			}
		} catch (error) {
			console.log(error);
		}
		return color;
	};

	const addMember = (member) => {
		setDictionary((prev) => ({
			...prev,
			[member.accountId]: member,
		}));
	};

	const addItem = (dic) => {
		setDictionary(prev => ({
			...prev,
			...dic,
		}))
	}

	useEffect(() => {
		let index = -1;
		let value = 200;
		const newColorHash = {};
		Object.keys(dictionary).forEach((item) => {
			
			if(!getColor(item) || getColor(item) === "black"){
				if (index >= colors.length - 1) {
					value += 100;
					index = 0;
				} else {
					index += 1;
				}
				if (value > 900) {
					index = 0;
					value = 200;
				}
				newColorHash[item] = {
					index: index,
					value: value,
				}
			}
		});
		setColorHash(prev => ({
			...prev, 
			...newColorHash,
		}))
	}, [dictionary, colors]);

	useEffect(() => {
		setDictionary(memberDictionary)
	}, [memberDictionary])

	return (
		<MemberContext.Provider
			value={{
				memberDictionary: dictionary,
				getColor,
				addMember,
				addItem,
			}}
		>
			{children}
		</MemberContext.Provider>
	);
};

export default MemberProvider;
