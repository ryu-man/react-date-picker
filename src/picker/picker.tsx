import React, { Component, useState } from 'react';
import DateInput from './date_input'
import SVGIcon from '../svg_icon';
import Calendar from '../calendar/calendar'
import CalendarContainer from './calendar_container'
import { SelectedDateContext, CalendarStateContext } from '../context'
import * as Icons from '../svg_icons'
import './picker.css'


type PickerProps = { children: React.ReactNode, format?: string, onChange?: (date: Date) => void }

interface Actions {
    [key: string]: (date: Date, value: number) => void
}

function changeHandler(format: string): (date: Date, value: number) => void {
    const actions: Actions = {
        d: (date: Date, value: number) => date.setDate(+value),
        M: (date: Date, value: number) => date.setMonth(+value),
        y: (date: Date, value: number) => date.setFullYear(+value)
    }

    return actions[format[0]]
}

const Picker = ({ children, format = "dd MMM yyyy", onChange }: PickerProps) => {
    const [selected, setSelected] = useState<Date | undefined>(undefined)
    const [calendarState, setCalendarState] = useState(false)


    return (
        <div className="picker-container" style={{ position: 'relative' }} onClick={e => {
            e.nativeEvent.stopImmediatePropagation()
        }}>
            <div className="picker" >
                {Array.from(format.matchAll(/\w+/g)).map(m => (
                    <DateInput key={m[0]} format={m[0]} selected={selected} action={changeHandler(m[0])}></DateInput>
                ))}
                <button
                    className="calendar-button"
                    onClick={(e) => {
                        setCalendarState(true)
                    }}>
                    <SVGIcon d={Icons.calendar} />
                </button>
            </div>

            <SelectedDateContext.Provider value={{ value: selected, action: setSelected }}>
                <CalendarStateContext.Provider value={{ value: calendarState, action: setCalendarState }}>
                    <CalendarContainer calendarState={calendarState} setCalendarState={setCalendarState}>
                        {children}
                    </CalendarContainer>
                </CalendarStateContext.Provider>
            </SelectedDateContext.Provider>
        </div>
    )
}


export default Picker 
