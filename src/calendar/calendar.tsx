import React, { useContext, useState } from 'react';
import { Predicate } from '../types';
import { CalendarStateContext } from '../picker/picker';
import { SelectedContext } from '../context/selectedContext'
import MonthComponent from '../month/month';
import Header from '../header/header';
import CalendarContextProvider from '../context/calendarContext'
import Options from '../options';
import './calendar.css'

type CalendarProps = { className?: string, style?: React.CSSProperties, initial?: Date, selected?: Date | undefined, predicate?: Predicate<Date>, locale?: string, onDateSelected?: (date: Date) => void }
type CalendarState = { index: number, selected: Date | undefined, calendar: Date }


export default ({ className = "", style, initial, locale, predicate = () => false, onDateSelected }: CalendarProps) => {
    let [calendarState, setCalendarState] = useContext(CalendarStateContext)
    const [selected, setSelected] = useContext(SelectedContext)
    const [showOptions, setShowOptions] = useState(false)


    return (
        <CalendarContextProvider initial={initial || selected}>
            <div ref={setCalendarContainer} className={`${className} calendar-container`} style={style} >
                <Header onAction={() => { setShowOptions(true) }} />
                <MonthComponent
                    predicate={predicate}
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>, time) => {
                        setSelected?.(new Date(time))
                        onDateSelected?.(selected)
                        setCalendarState?.(false)
                    }} />
                {showOptions && <Options onAction={() => { setShowOptions(false) }}></Options>}
            </div>
        </CalendarContextProvider>
    )

    function setCalendarContainer(element: HTMLDivElement) {
        let lossFocusHandler: { (e: MouseEvent): void } | undefined = undefined

        if (element) {
            lossFocusHandler = (e: MouseEvent) => {
                let target: Element | null = e.target as Element
                while (target) {
                    if (target === element) return
                    target = target.parentElement
                }
                setCalendarState?.(false)
                lossFocusHandler && document.removeEventListener('click', lossFocusHandler)
            }
            document.addEventListener('click', lossFocusHandler)
        } else {
            lossFocusHandler && document.removeEventListener('click', lossFocusHandler)

        }
    }
}