import React, { createContext, useState } from "react";

export const CalendarContext = createContext();

export default (props) => {
	const calendarState = useState(props?.initial ?? new Date());

	return (
		<CalendarContext.Provider value={calendarState}>
			{props.children}
		</CalendarContext.Provider>
	);
};
