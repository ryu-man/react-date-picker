import React, { createContext, useState } from 'react';
import SelectedContextProvider from '../context/selectedContext'
import DateInput from './date_input'
import SVGIcon from '../svg_icon';
import CalendarContainer from './calendar_container'
import * as Icons from '../svg_icons'
import './picker.css'


type PickerProps = { selected?: Date | undefined, children: React.ReactNode, format?: string, icon?: string, onChange?: (date: Date) => void }

interface Actions {
    [key: string]: (date: Date, value: number) => void
}


export const CalendarStateContext = createContext<any>([]);

function changeHandler(format: string): (date: Date, value: number) => void {
    const actions: Actions = {
        d: (date: Date, value: number) => date.setDate(+value),
        M: (date: Date, value: number) => date.setMonth(+value),
        y: (date: Date, value: number) => date.setFullYear(+value)
    }

    return actions[format[0]]
}

export default ({ selected, format = "iii dd MMM yyyy", icon = "right", onChange, children }: PickerProps) => {
    const calendarState = useState(false)

    return (
        <SelectedContextProvider selected={selected}>
            <div className="picker" style={{ position: 'relative' }} onClick={e => {
                e.nativeEvent.stopImmediatePropagation()
            }}>
                <div className="inner-picker" >
                    <div className="disable inputs">
                        {Array.from(format.matchAll(/(\w+|\W+)/g)).map((m,i) => {
                            console.log(m)
                            if (m[0].match(/\w+/g)) {
                                return <DateInput key={m[0]} format={m[0]} action={changeHandler(m[0])}></DateInput>
                            }else{
                                return <span key={m[0]+i}>{m[0]}</span>

                            }
                        })}
                    </div>
                    <button
                        className={`${icon} calendar-button`}
                        onClick={(e) => {
                            calendarState[1](true)
                        }}>
                        <SVGIcon d={Icons.calendar} />
                    </button>
                </div>


                <CalendarStateContext.Provider value={calendarState}>
                    <CalendarContainer >
                        {children}
                    </CalendarContainer>
                </CalendarStateContext.Provider>
            </div>
        </SelectedContextProvider>
    )
}