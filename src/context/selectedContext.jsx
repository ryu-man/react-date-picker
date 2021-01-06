import React, { createContext, useState } from "react";

export const SelectedContext = createContext();

export default ({ selected, children }) => {
	const selectedState = useState(selected);

	return (
		<SelectedContext.Provider value={selectedState}>
			{children}
		</SelectedContext.Provider>
	);
};
