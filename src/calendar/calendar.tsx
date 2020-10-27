import React, { useContext, useState } from 'react';
import MonthComponent from '../month/month';
import YearComponent from '../year/year';
import Header from '../header/header';
import Years from '../years/years';
import { CalendarStateContext, SelectedDateContext } from '../context'
import { Predicate } from '../types';
import './calendar.css'

type CalendarProps = { className?: string, style?: React.CSSProperties, initial?: Date, selected?: Date | undefined, predicate?: Predicate<Date>, locale?: string, onDateSelected?: (date: Date) => void }
type CalendarState = { index: number, selected: Date | undefined, calendar: Date }

function getToday(): Date {
    const date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    return date
}

function Calendar({ className = "", style, initial = getToday(), locale, predicate = () => false, onDateSelected }: CalendarProps) {
    const { value, action } = useContext(SelectedDateContext)
    const calendarStateContext = useContext(CalendarStateContext)
    const [index, setIndex] = useState(0)
    const [calendar, setCalendar] = useState(value ? new Date(value) : initial)

    const today = getToday()
    let lossFocusHandler: { (e: MouseEvent): void }
    return (
        <div ref={setCalendarContainer} className={`${className} calendar-container`} style={style} >
            <Header
                index={index}
                calendar={calendar}
                onChange={(date: Date) => { setCalendar(date) }}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>, index) => {
                    setIndex(index)

                }} />
            {
                index === 0 && (
                    <MonthComponent
                        calendar={calendar}
                        selected={value}
                        today={today}
                        predicate={predicate}
                        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>, time) => {
                            action(new Date(time))
                            onDateSelected && onDateSelected(value as Date)
                            calendarStateContext.action(false)
                        }} />
                )
            }
            {
                index === 1 && (
                    <YearComponent calendar={calendar} today={today} selected={value} predicate={predicate} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>, month: number) => {
                        calendar.setMonth(month);
                        setCalendar(calendar)
                        setIndex(0)
                        e.nativeEvent.stopImmediatePropagation()
                    }} />
                )
            }
            {
                index === 2 && (
                    <Years
                        calendar={calendar}
                        predicate={predicate}
                        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>, value: number) => {
                            calendar.setFullYear(value);
                            setCalendar(calendar)
                            setIndex(1)
                            e.nativeEvent.stopImmediatePropagation()
                        }} />
                )
            }
        </div>
    )

    function setCalendarContainer(element: HTMLDivElement) {
        if (element) {
            lossFocusHandler = (e: MouseEvent) => {
                let target: Element | null = e.target as Element
                while (target) {
                    if (target === element) return
                    target = target.parentElement
                }
                document.removeEventListener('click', lossFocusHandler)
                calendarStateContext.action(false)
            }
            document.addEventListener('click', lossFocusHandler)
        } else {
            document.removeEventListener('click', lossFocusHandler)

        }
    }




}

export default Calendar