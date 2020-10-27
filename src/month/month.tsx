import React, { useState } from 'react';
import { Day, Predicate } from '../types';
import { groupBy } from 'lodash'
import { format } from 'date-fns';
import { arDZ } from "date-fns/locale";
import DayComponent from '../day/day';
import './month.css'

// declaring the type of props
type MonthProps = { today: Date, selected: Date | undefined, calendar: Date, predicate: Predicate<Date>, onClick: (e: any, arg: any) => void }

// month generator is a monction responsible for generating the days of the month and thier props
const monthGen = function* (calendar: Date, today: Date, selected: Date | undefined, predicate: Predicate): Generator<Day> {
    // get day of week of the first day in this month
    const firstDayOfWeek = new Date(calendar.getFullYear(), calendar.getMonth(), 1).getDay()
    // get days count of last month
    const prevMonthDaysCount = new Date(calendar.getFullYear(), calendar.getMonth(), 0).getDate()
    // create sample start from the first week
    const sample = new Date(calendar.getFullYear(), calendar.getMonth() - 1, prevMonthDaysCount - firstDayOfWeek)
    // Generating days
    for (let index = 0; index < 42; index++) {
        sample.setDate(sample.getDate() + 1)
        yield {
            id: sample.getTime(),
            date: sample.getDate(),
            week: Math.floor(index / 7),
            month: sample.getMonth(),
            today: today.getTime() == sample.getTime(),
            weekend: sample.getDay() == 0,
            offmonth: calendar.getMonth() != sample.getMonth(),
            disabled: predicate(sample),
            selected: selected ? selected.getTime() == sample.getTime() : false,
            name: format(sample, 'iii')
        }
    }
}
//Building UI
export default function Month({ calendar, selected, today, predicate, onClick }: MonthProps) {

    let month = groupBy(Array.from(monthGen(calendar, today, selected, predicate)), d => d.week)
    return (
        <div className="month-container" >
            <div className="labels">
                {Object.values(month)[0].map(day => (
                    <div key={day.name} className="label-container">
                        <span className="label">{day.name}</span>
                    </div>
                ))}
            </div>
            <div className="days-container">
                {Object.values(month).map(week => (
                    week.map(day => (
                        <DayComponent key={day.id} day={day} onClick={onClick}></DayComponent>
                    ))
                ))}

            </div>
        </div>
    )
}