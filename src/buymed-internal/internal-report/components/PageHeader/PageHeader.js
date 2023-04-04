import React from "react";

import Box from "@material-ui/core/Box";

const PageHeader = ({children}) => {
	return (
		<Box
			sx={{
				padding: "16px",
				color: "#fff",
				backgroundColor: "rgb(26, 115, 184)",
				fontSize: "24px",
				width: "100%",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				borderTopLeftRadius: "4px",
				borderTopRightRadius:"4px"
			}}
		>
			{children}
		</Box>
	)
};

export default PageHeader;
