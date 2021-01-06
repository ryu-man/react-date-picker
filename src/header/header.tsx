import React, { useContext } from 'react';
import { format } from 'date-fns'
import SVGIcon from '../svg_icon';
import * as Icons from '../svg_icons'
import './header.css'
import { CalendarContext } from '../context/calendarContext';

type HeaderProps = { onAction: (e: any) => void }


const Header = ({ onAction }: HeaderProps) => {
    let [calendar, setCalendar] = useContext(CalendarContext)
    return (
        <div className="header-container" onClick={e => {
            e.nativeEvent.stopImmediatePropagation()
        }}>
            <div className="title" onClick={(e) => onAction(e)}>
                <pre>{format(calendar, "MMMM yyyy")}</pre>
            </div>
            <button className="prev" onClick={(e) => prev(e, calendar)}><SVGIcon d={Icons.arrowLeft} /></button>
            <button className="next" onClick={(e) => next(e, calendar)}><SVGIcon d={Icons.arrowRight} /></button>
        </div>
    )

    function next(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, calendar: Date, onChange?: (calendar: Date) => void) {
        calendar.setMonth(calendar.getMonth() + 1)
        setCalendar(new Date(calendar))
    }
    function prev(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, calendar: Date, onChange?: (calendar: Date) => void) {
        calendar.setMonth(calendar.getMonth() - 1)
        setCalendar(new Date(calendar))
    }

}
export default Header;