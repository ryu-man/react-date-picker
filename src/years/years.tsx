import React from 'react';
import { Predicate } from '../types';
import './years.css'
type YearsProps = { calendar: Date, predicate: Predicate, onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, value: number) => void }

const years = function* (min: number, max: number, calendar: Date, predicate: Predicate) {
    const sample = new Date(0, 11, 31)
    for (let i = min; i <= max; i++) {
        sample.setFullYear(i)
        yield {
            number: i,
            today: i == calendar.getFullYear(),
            disabled: predicate(sample)
        }
    }
}

export default ({ calendar, predicate, onClick }: YearsProps) => {
    return (
        <div className="years-container">
            { Array.from(years(calendar.getFullYear() - 4, calendar.getFullYear() + 4, calendar, predicate)).map(year => (
                <div
                    key={year.number}
                    className={`year center align${year.today ? ' today' : ""}${year.disabled ? ' disabled' : ''} column`}
                    onClick={(e) => {
                        onClick(e, year.number)
                    }}
                >
                    <span>{year.number}</span>
                </div>
            ))}

        </div>
    )
}