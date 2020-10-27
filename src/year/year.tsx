import React from 'react';
import { Month, Predicate } from '../types';
import './year.css';
import { format } from 'date-fns';

// Defining The props of the Year component
type YearProps = { calendar: Date, today: Date, selected: Date | undefined, predicate: Predicate<Date>, onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, month: number) => void }

// Generate The month of a year and thier properties
const yearGen = function* (calendar: Date, today: Date, selected: Date | undefined, predicate: Predicate<Date>): Generator<Month> {
    const start = new Date(calendar.getFullYear(), 0, 1) // first day of month
    const end = new Date(calendar.getFullYear(), 0, 31) // last day of month
    for (let i = 0; i < 12; i++) {
        start.setMonth(i)
        end.setMonth(i)
        yield {
            number: i,
            current: today.getMonth() == i,
            selected: selected ?
                (selected.getMonth() == i &&
                    selected.getFullYear() == start.getFullYear()) : false,
            disabled: predicate(start) && predicate(end),
            name: format(start, 'MMM')
        }

    }
}
// Building UI
export default ({ calendar, selected, today, predicate, onClick }: YearProps) => {
    return (
        <div className="year-container">
            {Array.from(yearGen(calendar, today, selected, predicate)).map(month => (
                <div key={month.name} className={`month${month.current ? ' current' : ''}${month.disabled ? ' disabled' : ''}${month.selected ? ' selected' : ''}`} onClick={(e) => {
                    onClick(e, month.number)
                }}>
                    <span>{month.name}</span>
                </div>
            ))}
        </div>
    )
}