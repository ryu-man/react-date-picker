import React from "react";
import { Day } from "../types";
import './day.css'

type WeekProps = { day: Day, onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, arg: number) => void }

export default ({ day, onClick }: WeekProps) => {
    return (
        <div
            className={`day-container${day.disabled ? " disabled" : ""}${day.offmonth ? " offmonth" : ""}${day.weekend ? " weekend" : ""}${day.today ? " today" : ""}${day.selected ? " selected" : ""}`}
            onClick={(e) => onClick(e, day.id)}
        >
            <span>{day.date}</span>
        </div>
    )
}
