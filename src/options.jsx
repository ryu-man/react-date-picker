import React, { useContext, useMemo, useState } from "react";
import classNames from "classnames";
import { format } from "date-fns";
import { CalendarContext } from "./context/calendarContext";
import * as Icons from "./svg_icons";
import SVGIcon from "./svg_icon";
import "./options.css";

const today = new Date();

function getMonths() {
	const sample = new Date();
	const array = [];
	for (let index = 0; index < 12; index++) {
		sample.setMonth(index);
		array.push({
			index,
			name: format(sample, "MMM"),
			today:
				index === today.getMonth() &&
				sample.getFullYear() === today.getFullYear(),
		});
	}
	return array;
}
function getYears(pivot) {
	const array = [];
	for (let index = pivot - 10 + 1; index <= pivot + 10; index++) {
		array.push(index);
	}
	return array;
}

const Years = ({ calendar, setCalendar, pivotYear }) => {
	const [innerCalendar, setInnerCalendar] = useState(calendar);
	const years = useMemo(() => getYears(pivotYear), [pivotYear]);
	return (
		<>
			{years.map((year, i) => (
				<div
					key={year}
					className={`year${today.getFullYear() == year ? " today" : ""}${
						innerCalendar.getFullYear() === year ? " selected" : ""
					}`}
					onClick={() => {
						innerCalendar.setFullYear(year);
						setInnerCalendar(new Date(innerCalendar));
						setCalendar(new Date(innerCalendar));
					}}
				>
					{year}
				</div>
			))}
		</>
	);
};

export default ({ onAction }) => {
	let [calendar, setCalendar] = useContext(CalendarContext);
	let [pivotYear, setPivotYear] = useState(calendar.getFullYear());

	return (
		<div className="options">
			<div className="options-container">
				<div className="months-container">
					{getMonths().map((month, i) => (
						<div
							key={month.index}
							className={`month${month.today ? " today" : ""}${
								calendar.getMonth() === i ? " selected" : ""
							}`}
							onClick={() => {
								calendar.setMonth(i);
								setCalendar(new Date(calendar));
								onAction?.();
							}}
						>
							{month.name}
						</div>
					))}
				</div>
				<div className="navigation buttons">
					<div
						className="prev button"
						onClick={() => setPivotYear((pivotYear -= 10))}
					>
						<SVGIcon d={Icons.arrowLeft} />
					</div>
					<span className="range">{`${pivotYear - 10} - ${
						pivotYear + 10
					}`}</span>
					<div
						className="next button"
						onClick={() => setPivotYear((pivotYear += 10))}
					>
						<SVGIcon d={Icons.arrowRight} />
					</div>
				</div>
				<div className="years-container scrollable">
					<Years
						calendar={calendar}
						setCalendar={setCalendar}
						pivotYear={pivotYear}
					/>
				</div>
			</div>
		</div>
	);
};
